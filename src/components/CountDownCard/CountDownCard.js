import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from "./CountDownCardStyles";
import Iconx from "react-native-vector-icons/MaterialCommunityIcons";

function CountDownCard({ title, formalDate, date, onDelete }) {

    const [remainigDays, setRemainigDays] = useState('');
    const [remainigHours, setRemainigHours] = useState('');
    const [remainigMinutes, setRemainigMinutes] = useState('');
    const [remainigSeconds, setRemainigSeconds] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            let currentDateTime = currentDate.getTime();

            const selDate = new Date(date);
            let selDateTime = selDate.getTime();

            let timeDiff = selDateTime - currentDateTime;

            if (timeDiff <= 1001) {
                clearInterval(interval);
                timeDiff = 0;
            }

            const { formattedDays, formattedHours, formattedMinutes, formattedSeconds } = formatTimeDifference(timeDiff);

            setRemainigDays(formattedDays);
            setRemainigHours(formattedHours);
            setRemainigMinutes(formattedMinutes);
            setRemainigSeconds(formattedSeconds);

        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

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

    return (
        <View style={styles.cardContainer} >
            <ImageBackground source={require("../../assets/images/1.jpg")} resizeMode='cover' borderRadius={12} style={styles.backgroundImage} >
                <View style={styles.overlay} >
                    <View style={{ flexDirection: "row" }} >
                        <Text style={styles.title} >{title}</Text>
                        <TouchableOpacity onPress={onDelete}>
                            <Iconx style={styles.deleteButton} name="delete-sweep-outline" size={20} color={"white"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.timeBody} >
                        <View style={styles.timeBox} >
                            <Text style={styles.timeTitles} >Gün </Text>
                            <Text style={styles.remainingTimes}>{remainigDays} </Text>
                        </View>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeTitles}>Saat </Text>
                            <Text style={styles.remainingTimes}>{remainigHours} </Text>
                        </View>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeTitles}>Dakika </Text>
                            <Text style={styles.remainingTimes}>{remainigMinutes} </Text>
                        </View>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeTitles}>Saniye </Text>
                            <Text style={styles.remainingTimes}>{remainigSeconds} </Text>
                        </View>
                    </View>
                    <View style={styles.dateBox} >
                        <Text style={styles.date} >{formalDate}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
};

export default CountDownCard;