import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./MainStyles";

function Main() {
    const [currentDate, setCurrentDate] = useState("");
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const getCurrentDate = () => {
            const date = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('tr-TR', options);

            setCurrentDate(formattedDate);
        };

        getCurrentDate();
    }, []);

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Merhaba</Text>
            <Text style={styles.date} >Bugün {currentDate}</Text>
            <View style={styles.row}>
                <View style={styles.inputBox} >
                    <TextInput style={styles.input} placeholder='Yeni Görev Yaz' value={newTask} onChangeText={setNewTask} />
                    <TouchableOpacity style={styles.button}>
                        <Text>
                            Takvim
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text>
                            Kategori
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.iconBox} >
                    <Icon name="send" size={18} color={"#f5e5ec"} />
                </TouchableOpacity>
            </View>

            <Text>{newTask}</Text>
        </View>
    )
};

export default Main;