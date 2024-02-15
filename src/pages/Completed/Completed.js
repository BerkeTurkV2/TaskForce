import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

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

    return (
        <View >
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
