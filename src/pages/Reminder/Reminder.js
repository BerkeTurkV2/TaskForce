import React, { useState, PureComponent } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
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

// PureComponent olarak tanımlanan CustomAgendaItem bileşeni
class CustomAgendaItem extends PureComponent {
    render() {
        const { item } = this.props;
        return (
            <View style={styles.itemBox}>
                <Text style={styles.eventTitle} >{item.name}</Text>
            </View>
        );
    }
}

function Reminder() {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [events, setEvents] = useState({});
    const [eventName, setEventName] = useState('');

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString || moment().format('YYYY-MM-DD'));
    };

    const handleAddEvent = () => {
        if (eventName) {
            const newEvent = {
                name: eventName,
            };
            setEvents({
                ...events,
                [selectedDate]: [...(events[selectedDate] || []), newEvent]
            });
            setEventName('');
        } else {
            alert('Lütfen notunuzu giriniz.');
        }
    };

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyContainer} >
                <Text style={styles.emptyTitle} >Bugün özel bir şey yok gibi görünüyor.</Text>
                <View style={styles.noteBox} >
                    <TextInput
                        style={styles.input}
                        placeholder="Notunuzu Yazın. Örn; Lord'un Doğum Günü"
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Doğum Günleri - Özel Günler</Text>
            <Text style={styles.underTitle}>Ajanda / Notlar</Text>
            <Agenda
                style={styles.agendaContainer}
                theme={{
                    agendaKnobColor: 'black',
                    dotColor: "#5d7e5c",
                    selectedDayBackgroundColor: "#5d7e5c",
                }}
                items={events}
                hideExtraDays={true}
                selected={selectedDate}
                onDayPress={handleDayPress}
                renderEmptyData={renderEmptyDate}
                // renderItem yerine CustomAgendaItem bileşeni kullanılıyor
                renderItem={(item) => <CustomAgendaItem item={item} />}
            />
        </View>
    )
};

export default Reminder;


