import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Animated, Alert } from 'react-native';
import styles from "./CountDownCardStyles";
import Iconx from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../../assets/colors/colors';

function CountDownCard({ title, formalDate, date, onDelete }) {
    const [remainigDays, setRemainigDays] = useState('');
    const [remainigHours, setRemainigHours] = useState('');
    const [remainigMinutes, setRemainigMinutes] = useState('');
    const [remainigSeconds, setRemainigSeconds] = useState('');
    const [isExpired, setIsExpired] = useState(false);
    
    // Animasyon değerleri
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        // Giriş animasyonu
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            tension: 50,
            useNativeDriver: true
        }).start();
        
        const interval = setInterval(() => {
            const currentDate = new Date();
            let currentDateTime = currentDate.getTime();

            const selDate = new Date(date);
            let selDateTime = selDate.getTime();

            let timeDiff = selDateTime - currentDateTime;

            if (timeDiff <= 0) {
                clearInterval(interval);
                timeDiff = 0;
                setIsExpired(true);
            }

            const { formattedDays, formattedHours, formattedMinutes, formattedSeconds } = formatTimeDifference(timeDiff);

            setRemainigDays(formattedDays);
            setRemainigHours(formattedHours);
            setRemainigMinutes(formattedMinutes);
            setRemainigSeconds(formattedSeconds);

        }, 1000);

        return () => clearInterval(interval);
    }, [date]);
    
    // Silme işlemi için onay kutusu
    const confirmDelete = () => {
        Alert.alert(
            "Geri Sayımı Sil",
            "Bu geri sayımı silmek istediğinize emin misiniz?",
            [
                {
                    text: "İptal",
                    style: "cancel"
                },
                { 
                    text: "Sil", 
                    onPress: onDelete,
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    const formatTimeDifference = (timeDiff) => {
        // Milisaniyeleri saniyeye dönüştür
        let seconds = Math.floor(timeDiff / 1000);
        // Saniyeleri dakikaya dönüştür
        let minutes = Math.floor(seconds / 60);
        // Dakikeleri saate dönüştür
        let hours = Math.floor(minutes / 60);
        // Saatleri güne dönüştür
        let days = Math.floor(hours / 24);

        // Kalan saniyeleri hesapla
        seconds %= 60;
        // Kalan dakikeleri hesapla
        minutes %= 60;
        // Kalan saatleri hesapla
        hours %= 24;

        const formattedDays = days.toString().padStart(2, '0');
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return { formattedDays, formattedHours, formattedMinutes, formattedSeconds };
    };

    // Rastgele bir arka plan resmi seçmek için
    const getRandomBackground = () => {
        const backgrounds = [
            require("../../assets/images/1.jpg"),
            // Eğer başka resimler varsa buraya eklenebilir
        ];
        return backgrounds[0]; // Şu an için sadece bir resim var
    };
    
    return (
        <Animated.View style={[styles.cardContainer, { transform: [{ scale: scaleAnim }] }]} >
            <ImageBackground 
                source={getRandomBackground()} 
                resizeMode='cover' 
                style={styles.backgroundImage}
            >
                <View style={styles.overlay} >
                    <View style={styles.titleContainer} >
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity onPress={confirmDelete} activeOpacity={0.7}>
                            <Iconx style={styles.deleteButton} name="delete-sweep-outline" size={22} color={"white"} />
                        </TouchableOpacity>
                    </View>
                    
                    {isExpired ? (
                        <Text style={styles.expiredText}>Süre Doldu!</Text>
                    ) : (
                        <View style={styles.timeBody}>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeTitles}>Gün</Text>
                                <Text style={styles.remainingTimes}>{remainigDays}</Text>
                            </View>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeTitles}>Saat</Text>
                                <Text style={styles.remainingTimes}>{remainigHours}</Text>
                            </View>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeTitles}>Dakika</Text>
                                <Text style={styles.remainingTimes}>{remainigMinutes}</Text>
                            </View>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeTitles}>Saniye</Text>
                                <Text style={styles.remainingTimes}>{remainigSeconds}</Text>
                            </View>
                        </View>
                    )}
                    
                    <View style={styles.dateBox}>
                        <Text style={styles.date}>{formalDate}</Text>
                    </View>
                </View>
            </ImageBackground>
        </Animated.View>
    )
};

export default CountDownCard;