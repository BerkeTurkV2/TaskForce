import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./CalendarStyles";

import CountDownCard from '../../components/CountDownCard/CountDownCard';

function CalendarPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedDate, setSelectedDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [counterList, setCounterList] = useState([]);

    useEffect(() => {
        const fetchCounterList = async () => {
            try {
                const storedList = await AsyncStorage.getItem('counterList');
                if (storedList !== null) {
                    setCounterList(JSON.parse(storedList));
                }
            } catch (error) {
                console.error('Error fetching counter list: ', error);
            }
        };

        fetchCounterList();
    }, []);

    const calculateTimeDifferenceForItem = (item) => {
        const currentDate = new Date(); // Şu anki tarih ve saat
        const selectedDateTime = new Date(item.date); // Öğenin tarih ve saat bilgisi
        console.log("currentDate", currentDate);
        console.log("selectedDateTime", selectedDateTime);
        // Zaman farkını hesapla
        const timeDifference = selectedDateTime - currentDate;
        console.log("timeDifference", timeDifference);
        // Farkı gün, saat ve dakikaya çevir
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return { days: daysDifference, hours: hoursDifference, minutes: minutesDifference };
    };

    // Her bir öğe için kalan zamanı ekranda göster
    const renderTimeDifferenceForItem = (item) => {
        if (item.date !== '') {
            const { days, hours, minutes } = calculateTimeDifferenceForItem(item);
            if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes)) {
                return `${days} gün ${hours} saat ${minutes} dakika`;
            } else {
                return "Geçersiz tarih formatı";
            }
        }
        return '';
    };
    

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        const formattedDate = date.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
        const formattedTime = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        setSelectedDate(`${formattedDate}, ${formattedTime}`);
        hideDatePicker();
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const addCounterItem = async () => {
        try {
            // Yeni öğeyi listeye ekle
            const newCounterList = [...counterList, { title, date: selectedDate }];
            // Güncellenmiş listeyi AsyncStorage'e kaydet
            await AsyncStorage.setItem('counterList', JSON.stringify(newCounterList));
            setCounterList(newCounterList);
        } catch (error) {
            console.error('Error adding counter item: ', error);
        }
        setTitle("");
        setSelectedDate("");
        setModalVisible(false);
    };

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Planlar - Projeler - Etkinlikler</Text>
            <Text style={styles.underTitle}>Geri Sayım Sayacı</Text>
            <View>
                {counterList.map((item, index) => (
                    <CountDownCard key={index} title={item.title} date={item.date} remainingTime={renderTimeDifferenceForItem(item)} />
                ))}
            </View>
            <TouchableOpacity style={styles.addIcon} onPress={openModal} >
                <Icon name="pluscircle" size={44} color={"#5d7e5c"} />
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle} >Geri Sayımı Oluştur</Text>
                        <View style={styles.separator} />
                        <Text style={styles.acyivityName} >Başlık</Text>
                        <TextInput style={styles.input} placeholder='Başlık yazın. Örn: Tez Sunumu' value={title} onChangeText={setTitle} />

                        <Text style={styles.acyivityName} >Tarih</Text>
                        <TouchableOpacity onPress={showDatePicker}>
                            <Text style={styles.calenderTitle} >Tarih Seçmek için Tıkla</Text>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={handleConfirmDate}
                            onCancel={hideDatePicker}
                        />
                        {selectedDate !== '' && <Text style={styles.selectedDate} >{selectedDate}</Text>}
                        <TouchableOpacity style={styles.addButton} onPress={addCounterItem}>
                            <Text style={styles.addButtonText} >Ekle</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Icon name="closesquare" size={20} color="#494b4c" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
};

export default CalendarPage;