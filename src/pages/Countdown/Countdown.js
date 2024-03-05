import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/AntDesign";
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
                    setSelectedDate(new Date(storedDate));
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
                // Yeni öğeyi listeye ekle
                const newCounterList = [...counterList, { title, formalDate: selectedFormalDate, date: selectedDate, }];
                // Güncellenmiş listeyi AsyncStorage'e kaydet
                await AsyncStorage.setItem('counterList', JSON.stringify(newCounterList));
                setCounterList(newCounterList);

                setTitle("");
                setSelectedFormalDate("");
                setModalVisible(false);
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

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Planlar - Projeler - Etkinlikler</Text>
            <Text style={styles.underTitle}>Geri Sayım Sayacı</Text>
            <ScrollView>
                {counterList.map((item, index) => (
                    <CountDownCard key={index} title={item.title} formalDate={item.formalDate} date={item.date} onDelete={() => deleteCounterItem(index)} />
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
                        <TextInput style={styles.input} placeholder='Başlık yazın. Örn: Tez Sunumu' value={title} onChangeText={setTitle} maxLength={34} />

                        <Text style={styles.acyivityName} >Tarih</Text>
                        <TouchableOpacity onPress={showDatePicker}>
                            <Text style={styles.calenderTitle} >{showDateSelectionPrompt ? "Tarih Seçilmedi! Lütfen Tarih Seçin." : "Tarih Seçmek için Tıkla"}</Text>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={handleConfirmDate}
                            onCancel={hideDatePicker}
                        />
                        {selectedFormalDate !== '' && <Text style={styles.selectedDate} >{selectedFormalDate}</Text>}
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