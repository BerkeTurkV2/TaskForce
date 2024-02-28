import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import styles from "./CountDownCardStyles";

function CountDownCard({ title, date, test }) {

    const [remainingTime, setRemainingTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            let currentDateTime = currentDate.getTime();

            const selDate = new Date(test);
            let selDateTime = selDate.getTime();

            let timeDiff = selDateTime - currentDateTime;

            const { days, hours, minutes, seconds } = formatTimeDifference(timeDiff);

            const remainingTime = `${days} gün ${hours} saat ${minutes} dakika ${seconds} saniye`;
        
            setRemainingTime(remainingTime);

        }, 1000);

        return () => clearInterval(interval);
    }, []);

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

        return { days, hours, minutes, seconds };
    };


    return (
        <View style={styles.cardContainer} >
            <View >
                <Text style={styles.title} >{title}</Text>
                <Text>tarih : {date}</Text>
                <Text>kalan zaman : {remainingTime}</Text>
            </View>
        </View>

    )
};

export default CountDownCard;