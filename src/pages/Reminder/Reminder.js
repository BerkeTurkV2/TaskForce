import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button } from 'react-native';
import { Calendar }  from 'react-native-big-calendar';

// Takvim bileşenini oluşturmak için gerekli ayarlamalar
//BigCalendar.setLocale('tr-TR');

import styles from "./ReminderStyles";

function Reminder() {

    const [modalVisible, setModalVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [eventTitle, setEventTitle] = useState('');

    const handleDateSelected = (event) => {
        setSelectedDate(event.startDate);
        setModalVisible(true);
    };

    const handleAddEvent = () => {
        setEvents([...events, { title: eventTitle, startDate: selectedDate }]);
        setModalVisible(false);
    };

    return (
        <View style={styles.container} >
            <Text style={styles.title}>Doğum Günleri - Özel Günler</Text>
            <Text style={styles.underTitle}>Hatırlatıcı</Text>
            <Calendar  
                events={events}
                onSelectEvent={handleDateSelected}
                activeDate={selectedDate}
                height={600}
            />
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Başlık"
                            onChangeText={(text) => setEventTitle(text)}
                        />
                        <Button title="Ekle" onPress={handleAddEvent} />
                    </View>
                </View>
            </Modal>
        </View>
    )
};

export default Reminder;