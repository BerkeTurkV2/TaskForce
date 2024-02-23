import React from 'react'
import { View, Text, ImageBackground } from 'react-native';
import styles from "./CountDownCardStyles";

function CountDownCard({ title, date, remainingTime}) {
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