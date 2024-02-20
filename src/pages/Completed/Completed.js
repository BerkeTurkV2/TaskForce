import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from "./CompletedStyles";
import CompletedTasks from '../../components/CompletedTasks/CompletedTasks';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Completed() {
    const [completedList, setCompletedList] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const completedTasksString = await AsyncStorage.getItem('completedTasks');
                if (completedTasksString) {
                    const completedTasks = JSON.parse(completedTasksString);
                    setCompletedList(completedTasks);
                }
            } catch (error) {
                console.error("Error : ", error);
            }
        };

        loadTasks();
    }, []);

    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            console.log("Tüm veriler başarıyla silindi.");
        } catch (error) {
            console.error("Verileri silerken bir hata oluştu:", error);
        }
    };

    return (
        <View style={styles.container} >
            <FlatList
                data={completedList.reverse()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <CompletedTasks task={item.task} currentDate={item.currentDate} />
                )}
            />
            <TouchableOpacity style={styles.buttonBox} onPress={clearAllData}>
                <Text style={styles.buttonText} >Görevleri Temizle</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Completed;
