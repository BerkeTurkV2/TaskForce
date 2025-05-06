import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, Animated, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/AntDesign";
import Iconx from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../../assets/colors/colors';
import styles from "./CountdownStyles";

import CountDownCard from '../../components/CountDownCard/CountDownCard';

function CalendarPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedFormalDate, setSelectedFormalDate] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [counterList, setCounterList] = useState([]);
    const [showDateSelectionPrompt, setShowDateSelectionPrompt] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    // Animasyon değerleri
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        const fetchCounterList = async () => {
            setIsLoading(true);
            try {
                const storedList = await AsyncStorage.getItem('counterList');
                if (storedList !== null) {
                    setCounterList(JSON.parse(storedList));
                }
            } catch (error) {
                console.error('Error fetching counter list: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchSelectedDate = async () => {
            try {
                const storedDate = await AsyncStorage.getItem('selectedDate');
                if (storedDate !== null) {
                    setSelectedDate(new Date(storedDate));
                }
            } catch (error) {
                console.error('Error fetching selected date: ', error);
            }
        };

        fetchCounterList();
        fetchSelectedDate();
        
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

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        setSelectedDate(date);

        AsyncStorage.setItem('selectedDate', date.toISOString());

        const formattedDate = date.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
        const formattedTime = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        setSelectedFormalDate(`${formattedDate} ${formattedTime}`);
        setShowDateSelectionPrompt(false);

        hideDatePicker();
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setTitle("");
        setSelectedFormalDate("");
        setShowDateSelectionPrompt(false);
    };

    const addCounterItem = async () => {
        try {
            if (title !== '' && selectedFormalDate !== '') {
                // Modal'i kapat
                setModalVisible(false);
                
                // Yeni öğeyi listeye ekle
                const newItem = { 
                    id: Date.now().toString(),
                    title, 
                    formalDate: selectedFormalDate, 
                    date: selectedDate 
                };
                const newCounterList = [...counterList, newItem];
                
                // Güncellenmiş listeyi AsyncStorage'e kaydet
                await AsyncStorage.setItem('counterList', JSON.stringify(newCounterList));
                setCounterList(newCounterList);

                // Form alanlarını sıfırla
                setTitle("");
                setSelectedFormalDate("");
            } else {
                setShowDateSelectionPrompt(true);
            }
        } catch (error) {
            console.error('Error adding counter item: ', error);
        }
    };

    const deleteCounterItem = async (index) => {
        try {
            const newList = [...counterList];
            newList.splice(index, 1);
            await AsyncStorage.setItem('counterList', JSON.stringify(newList));
            setCounterList(newList);
        } catch (error) {
            console.error('Error deleting counter item: ', error);
        }
    };

    // Boş liste durumu için render fonksiyonu
    const renderEmptyList = () => {
        if (isLoading) {
            return (
                <View style={styles.emptyList}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.emptyListText}>Geri sayımlar yükleniyor...</Text>
                </View>
            );
        }
        
        return (
            <View style={styles.emptyList}>
                <Iconx name="timer-outline" size={60} color={colors.primary} />
                <Text style={styles.emptyListText}>Henüz geri sayım eklenmemiş</Text>
                <Text style={[styles.emptyListText, { marginTop: 5 }]}>Yeni bir geri sayım eklemek için + butonunu kullanabilirsiniz</Text>
            </View>
        );
    };
    
    return (
        <Animated.View 
            style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Planlar - Projeler - Etkinlikler</Text>
                <Text style={styles.underTitle}>Geri Sayım Sayacı</Text>
            </View>
            
            {counterList.length === 0 && !isLoading ? (
                renderEmptyList()
            ) : (
                <ScrollView 
                    style={styles.countdownList}
                    showsVerticalScrollIndicator={false}
                >
                    {counterList.map((item, index) => (
                        <CountDownCard 
                            key={item.id || index} 
                            title={item.title} 
                            formalDate={item.formalDate} 
                            date={item.date} 
                            onDelete={() => deleteCounterItem(index)} 
                        />
                    ))}
                </ScrollView>
            )}
            
            <TouchableOpacity 
                style={styles.addIcon} 
                onPress={openModal}
                activeOpacity={0.8}
            >
                <Icon name="pluscircle" size={50} color={colors.primary} />
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Geri Sayımı Oluştur</Text>
                        <View style={styles.separator} />
                        
                        <Text style={styles.acyivityName}>Başlık</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Başlık yazın. Örn: Tez Sunumu' 
                            placeholderTextColor="#999"
                            value={title} 
                            onChangeText={setTitle} 
                            maxLength={34} 
                        />

                        <Text style={styles.acyivityName}>Tarih</Text>
                        <TouchableOpacity onPress={showDatePicker} activeOpacity={0.7}>
                            <Text style={[styles.calenderTitle, showDateSelectionPrompt && styles.dateWarning]}>
                                {showDateSelectionPrompt ? "Tarih Seçilmedi! Lütfen Tarih Seçin." : "Tarih Seçmek için Tıkla"}
                            </Text>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={handleConfirmDate}
                            onCancel={hideDatePicker}
                            cancelTextIOS="İptal"
                            confirmTextIOS="Onayla"
                            headerTextIOS="Tarih ve Saat Seçin"
                        />
                        
                        {selectedFormalDate !== '' && (
                            <Text style={styles.selectedDate}>{selectedFormalDate}</Text>
                        )}
                        
                        <TouchableOpacity 
                            style={styles.addButton} 
                            onPress={addCounterItem}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.addButtonText}>Ekle</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.closeButton} 
                            onPress={closeModal}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Icon name="closesquare" size={24} color={colors.closesquare} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Animated.View>
    )
};

export default CalendarPage;