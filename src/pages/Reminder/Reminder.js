import React, { useState, useEffect, useCallback  } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../../assets/colors/colors';
import moment from 'moment';

import styles from "./ReminderStyles";

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

function Reminder() {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [events, setEvents] = useState({});
    const [eventName, setEventName] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const storedEvents = await AsyncStorage.getItem('events');
                if (storedEvents !== null) {
                    setEvents(JSON.parse(storedEvents));
                }
            } catch (error) {
                console.error('Error fetching events: ', error);
            }
        };

        fetchEvents();
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
    };

    const handleAddEvent = () => {
        if (eventName) {
            const newEvent = {
                name: eventName,
            };
            const updatedEvents = {
                ...events,
                [selectedDate]: [...(events[selectedDate] || []), newEvent]
            };
            setEvents(updatedEvents);
            saveEvents(updatedEvents);
            setEventName('');
        } else {
            Alert.alert('Uyarı', 'Lütfen notunuzu giriniz.');
        }
    };

    const deleteEvent = (date, event) => {
        const updatedEvents = {...events};
        updatedEvents[date] = updatedEvents[date].filter(item => item !== event);
    
        // Eğer bu tarih artık etkinlik içermiyorsa, tarihi events nesnesinden kaldır
        if (updatedEvents[date].length === 0) {
            delete updatedEvents[date];
        }
    
        setEvents(updatedEvents);
        saveEvents(updatedEvents); // AsyncStorage'deki kayıtları güncelle
    };
    
    
    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyContainer} >
                <Text style={styles.emptyTitle} >Bugün özel bir şey yok gibi görünüyor.</Text>
                <View style={styles.noteBox} >
                    <TextInput
                        style={styles.input}
                        placeholder="Notunuzu Yazın. Örn; Berke'nin Doğum Günü"
                        value={eventName}
                        onChangeText={text => setEventName(text)}
                    />
                    <TouchableOpacity style={styles.buttonBox} onPress={handleAddEvent}>
                        <Text style={styles.addButton}>Ekle</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderItem = useCallback((item) => {
        const date = Object.keys(events).find(date => events[date].includes(item));
        return (
            <View style={styles.itemBox} >
                <Text style={styles.eventTitle}>{item.name}</Text>
                <TouchableOpacity onPress={() => deleteEvent(date, item)}>
                    <Icon style={styles.icon} name="delete-sweep-outline" size={18} color={"black"} />
                </TouchableOpacity>
            </View>
        );
    }, [events]);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Doğum Günleri - Özel Günler</Text>
            <Text style={styles.underTitle}>Ajanda / Notlar</Text>
            <Agenda
                style={styles.agendaContainer}
                theme={{
                    agendaKnobColor: 'gray',
                    dotColor: "red",
                    agendaTodayColor: colors.primary,
                    todayTextColor: colors.primary,
                    selectedDayBackgroundColor: colors.primary,
                }}
                maxToRenderPerBatch={5}
                initialNumToRender={5}
                items={events}
                hideExtraDays={true}
                selected={selectedDate}
                onDayPress={handleDayPress}
                renderEmptyData={renderEmptyDate}
                renderItem={(item) => renderItem(item)}
            />
        </View>
    )
};

export default Reminder;


