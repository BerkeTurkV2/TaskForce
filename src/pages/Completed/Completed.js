import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

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
        <View >
            <Button title='ögeleri SİL' onPress={clearAllData} />
            <FlatList
                data={completedList.reverse()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.date}</Text>
                        <Text>{item.task}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default Completed;
