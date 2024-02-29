import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
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

    const [test, setTest] = useState('');

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

        const fetchSelectedDate = async () => {
            try {
                const storedDate = await AsyncStorage.getItem('selectedDate');
                if (storedDate !== null) {
                    setTest(new Date(storedDate));
                }
            } catch (error) {
                console.error('Error fetching selected date: ', error);
            }
        };

        fetchCounterList();
        fetchSelectedDate();
    }, []);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        setTest(date);

        AsyncStorage.setItem('selectedDate', date.toISOString());

        const formattedDate = date.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
        const formattedTime = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        
        setSelectedDate(`${formattedDate} ${formattedTime}`);

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
            const newCounterList = [...counterList, { title, date: selectedDate, x: test, }];
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

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Planlar - Projeler - Etkinlikler</Text>
            <Text style={styles.underTitle}>Geri Sayım Sayacı</Text>
            <ScrollView>
                {counterList.map((item, index) => (
                    <CountDownCard key={index} title={item.title} date={item.date} test={item.x} onDelete={() => deleteCounterItem(index)} />
                ))}
            </ScrollView>
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