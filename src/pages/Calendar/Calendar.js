import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./CalendarStyles";

function CalendarPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedDate, setSelectedDate] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
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

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Planlar - Projeler - Etkinlikler</Text>
            <Text style={styles.underTitle}>Geri Sayım Sayacı</Text>
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
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        {selectedDate !== '' && <Text style={styles.selectedDate} >{selectedDate}</Text>}
                        <TouchableOpacity style={styles.addButton} onPress={null}>
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