import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Switch, Animated, ActivityIndicator, Platform, Dimensions, ScrollView, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PushNotification from "react-native-push-notification";
import { colors } from '../../assets/colors/colors';
import moment from 'moment';

import styles from "./ReminderStyles";

const deviceSize = Dimensions.get('window');

LocaleConfig.locales['tr'] = {
    monthNames: [
        'Ocak',
        'Şubat',
        'Mart',
        'Nisan',
        'Mayıs',
        'Haziran',
        'Temmuz',
        'Ağustos',
        'Eylül',
        'Ekim',
        'Kasım',
        'Aralık'
    ],
    monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    today: "Bugün"
};

LocaleConfig.defaultLocale = 'tr';

// Bildirim kanalını oluştur
const createChannel = () => {
    PushNotification.createChannel(
        {
            channelId: "reminder-channel",
            channelName: "Reminder Notifications",
            channelDescription: "TaskForce hatırlatıcı bildirimleri",
            playSound: true,
            soundName: "default",
            importance: 4,
            vibrate: true,
        },
        (created) => console.log(`Bildirim kanalı oluşturuldu: ${created}`)
    );
};

// Bildirimleri yapılandır
const configureNotifications = () => {
    try {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: false,
            requestPermissions: Platform.OS === 'ios',
        });
        
        // Android için kanal oluştur
        if (Platform.OS === 'android') {
            createChannel();
        }
    } catch (error) {
        console.error('Bildirim yapılandırma hatası:', error);
    }
};

function Reminder() {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [events, setEvents] = useState({});
    const [eventName, setEventName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [reminderTime, setReminderTime] = useState(null);
    const [enableNotification, setEnableNotification] = useState(false);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    
    // Animasyon değerleri
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        // Bildirimleri yapılandır
        configureNotifications();
        
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const storedEvents = await AsyncStorage.getItem('events');
                if (storedEvents !== null) {
                    const parsedEvents = JSON.parse(storedEvents);
                    setEvents(parsedEvents);
                    // Başlangıçta seçili günün etkinliklerini ayarla
                    setSelectedDateEvents(parsedEvents[selectedDate] || []);
                }
            } catch (error) {
                console.error('Error fetching events: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
        
        // Sayfa yüklendiğinde animasyon başlat
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true
            })
        ]).start();
    }, []);

    const saveEvents = async (updatedEvents) => {
        try {
            await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
        } catch (error) {
            console.error('Error saving events: ', error);
        }
    };

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString || moment().format('YYYY-MM-DD'));
        // Seçilen günün etkinliklerini güncelle
        setSelectedDateEvents(events[day.dateString] || []);
    };

    // Zaman seçici için fonksiyonlar
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        setReminderTime(time);
        hideTimePicker();
    };
    
    // Bildirim oluşturma fonksiyonu
    const scheduleNotification = (eventId, eventName, eventDate, reminderTime) => {
        try {
            if (!reminderTime) return;
            
            const notificationDate = new Date(eventDate);
            
            // Hatırlatıcı saati ayarla
            notificationDate.setHours(reminderTime.getHours());
            notificationDate.setMinutes(reminderTime.getMinutes());
            
            // Eğer bildirim zamanı geçmişse, bildirim gönderme
            if (notificationDate <= new Date()) {
                Alert.alert('Uyarı', 'Geçmiş bir zaman için bildirim ayarlanamaz.');
                return;
            }
            
            // Bildirim planlama
            if (Platform.OS === 'android') {
                PushNotification.localNotificationSchedule({
                    id: eventId,
                    channelId: "reminder-channel",
                    title: "TaskForce Hatırlatıcı",
                    message: eventName,
                    date: notificationDate,
                    allowWhileIdle: true,
                    playSound: true,
                    soundName: "default",
                });
                
                Alert.alert('Bildirim Ayarlandı', `"${eventName}" için ${moment(notificationDate).format('DD MMMM YYYY HH:mm')} tarihinde bildirim alacaksınız.`);
            } else {
                // iOS için farklı bir yaklaşım kullanabiliriz
                console.log('iOS bildirim planlaması atlandı');
                Alert.alert('Bildirim', 'Bildirim özelliği şu anda sadece Android için desteklenmektedir.');
            }
        } catch (error) {
            console.error('Bildirim planlama hatası:', error);
            Alert.alert('Hata', 'Bildirim ayarlanırken bir hata oluştu.');
        }
    };
    
    const handleAddEvent = () => {
        if (eventName) {
            const eventId = Date.now().toString();
            const newEvent = {
                id: eventId,
                name: eventName,
                hasNotification: enableNotification,
                notificationTime: reminderTime ? reminderTime.toISOString() : null
            };
            
            const updatedEvents = {
                ...events,
                [selectedDate]: [...(events[selectedDate] || []), newEvent]
            };
            
            setEvents(updatedEvents);
            setSelectedDateEvents(updatedEvents[selectedDate] || []);
            saveEvents(updatedEvents);
            
            // Bildirim ayarlanmışsa, zamanla
            if (enableNotification && reminderTime) {
                scheduleNotification(eventId, eventName, selectedDate, reminderTime);
            }
            
            // Form alanlarını sıfırla
            setEventName('');
            setEnableNotification(false);
            setReminderTime(null);
        } else {
            Alert.alert('Uyarı', 'Lütfen notunuzu giriniz.');
        }
    };

    const deleteEvent = (date, event) => {
        // Silme işlemi için onay iste
        Alert.alert(
            "Etkinliği Sil",
            `"${event.name}" etkinliğini silmek istediğinize emin misiniz?`,
            [
                {
                    text: "İptal",
                    style: "cancel"
                },
                { 
                    text: "Sil", 
                    onPress: () => {
                        // Etkinliği sil
                        const updatedEvents = {...events};
                        updatedEvents[date] = updatedEvents[date].filter(item => item !== event);
                    
                        // Eğer bu tarih artık etkinlik içermiyorsa, tarihi events nesnesinden kaldır
                        if (updatedEvents[date].length === 0) {
                            delete updatedEvents[date];
                        }
                    
                        setEvents(updatedEvents);
                        setSelectedDateEvents(updatedEvents[date] || []);
                        saveEvents(updatedEvents); // AsyncStorage'deki kayıtları güncelle
                        
                        // Eğer bildirim varsa iptal et
                        try {
                            if (event.hasNotification && event.id) {
                                PushNotification.cancelLocalNotification(event.id);
                            }
                        } catch (error) {
                            console.error('Bildirim iptal hatası:', error);
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };
    
    
    // Etkinlik ekleme formu
    const renderEventForm = () => {
        return (
            <View style={styles.noteBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Notunuzu Yazın. Örn; Berke'nin Doğum Günü"
                    placeholderTextColor="#999"
                    value={eventName}
                    onChangeText={text => setEventName(text)}
                />
                
                <View style={styles.notificationSwitch}>
                    <Text style={styles.notificationText}>Bildirim Ekle</Text>
                    <Switch
                        trackColor={{ false: '#ddd', true: `${colors.primary}80` }}
                        thumbColor={enableNotification ? colors.primary : '#f4f3f4'}
                        onValueChange={setEnableNotification}
                        value={enableNotification}
                    />
                </View>
                
                {enableNotification && (
                    <TouchableOpacity 
                        style={styles.timePickerButton}
                        onPress={showTimePicker}
                    >
                        <Icon name="clock-outline" size={18} color={colors.primary} />
                        <Text style={styles.timePickerText}>
                            {reminderTime ? moment(reminderTime).format('HH:mm') : 'Bildirim saati seç'}
                        </Text>
                    </TouchableOpacity>
                )}
                
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                    cancelTextIOS="İptal"
                    confirmTextIOS="Onayla"
                    headerTextIOS="Bildirim Saati Seçin"
                />
                
                <TouchableOpacity 
                    style={styles.buttonBox} 
                    onPress={handleAddEvent}
                    activeOpacity={0.7}
                >
                    <Text style={styles.addButton}>Ekle</Text>
                </TouchableOpacity>
            </View>
        );
    };
    
    // Etkinlik listesi
    const renderEventsList = () => {
        if (isLoading) {
            return (
                <View style={styles.eventsContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.emptyTitle}>Etkinlikler yükleniyor...</Text>
                </View>
            );
        }
        
        if (selectedDateEvents.length === 0) {
            return (
                <View style={styles.eventsContainer}>
                    <Icon name="calendar-blank" size={60} color={colors.primary} style={styles.emptyIcon} />
                    <Text style={styles.emptyTitle}>{moment(selectedDate).format('DD MMMM YYYY')} tarihinde özel bir şey yok gibi görünüyor.</Text>
                </View>
            );
        }
        
        return (
            <View style={styles.eventsList}>
                {selectedDateEvents.map((item) => (
                    <View key={item.id}>
                        {renderEventItem(item)}
                    </View>
                ))}
            </View>
        );
    };

    // Tek bir etkinlik öğesi
    const renderEventItem = (item) => {
        return (
            <Animated.View 
                style={styles.itemBox}
            >
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {item.hasNotification && (
                            <Icon 
                                name="bell-ring-outline" 
                                size={18} 
                                color={colors.primary} 
                                style={styles.reminderIcon} 
                            />
                        )}
                        <Text style={styles.eventTitle}>{item.name}</Text>
                    </View>
                    {item.hasNotification && item.notificationTime && (
                        <Text style={styles.reminderTime}>
                            Hatırlatıcı: {moment(item.notificationTime).format('HH:mm')}
                        </Text>
                    )}
                </View>
                <TouchableOpacity 
                    onPress={() => deleteEvent(selectedDate, item)}
                    activeOpacity={0.7}
                >
                    <Icon style={styles.icon} name="delete-sweep-outline" size={20} color={colors.primary} />
                </TouchableOpacity>
            </Animated.View>
        );
    };
    
    // İşaretlenmiş tarihleri hazırla
    const getMarkedDates = () => {
        const markedDates = {};
        
        // Tüm etkinlikleri işaretle
        Object.keys(events).forEach(date => {
            if (events[date] && events[date].length > 0) {
                markedDates[date] = { marked: true, dotColor: colors.primary };
            }
        });
        
        // Seçili tarihi vurgula
        markedDates[selectedDate] = {
            ...markedDates[selectedDate],
            selected: true,
            selectedColor: colors.primary,
        };
        
        return markedDates;
    };

    return (
        <Animated.View 
            style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Doğum Günleri - Özel Günler</Text>
                <Text style={styles.underTitle}>Ajanda / Notlar</Text>
            </View>
            
            <ScrollView style={styles.scrollContainer}>
                <Calendar
                    style={styles.calendar}
                    current={selectedDate}
                    onDayPress={handleDayPress}
                    markedDates={getMarkedDates()}
                    firstDay={1}
                    enableSwipeMonths={true}
                    hideExtraDays={false}
                    theme={{
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#666',
                        selectedDayBackgroundColor: colors.primary,
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: colors.primary,
                        dayTextColor: '#444',
                        textDisabledColor: '#c0c0c0',
                        dotColor: colors.primary,
                        selectedDotColor: '#ffffff',
                        arrowColor: colors.primary,
                        monthTextColor: colors.primary,
                        indicatorColor: colors.primary,
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 14
                    }}
                />
                
                <View style={styles.selectedDateContainer}>
                    <Text style={styles.selectedDateText}>
                        {moment(selectedDate).format('DD MMMM YYYY')}
                    </Text>
                </View>
                
                {renderEventsList()}
                
                {renderEventForm()}
            </ScrollView>
        </Animated.View>
    )
};

export default Reminder;


