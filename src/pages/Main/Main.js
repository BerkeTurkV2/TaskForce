import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Ionicons";
import Iconx from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./MainStyles";

function Main() {
    const [currentDate, setCurrentDate] = useState("");
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const getCurrentDate = () => {
            const date = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('tr-TR', options);

            setCurrentDate(formattedDate);
        };

        getCurrentDate();
    }, []);

    // AsyncStorageden veriyi almalik kısım
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const savedTasks = await AsyncStorage.getItem('taskList');
                if (savedTasks) {
                    const parsedTasks = JSON.parse(savedTasks);
                    setTaskList(parsedTasks);
                }
            } catch (error) {
                console.error("Error : ", error);
            }
        };

        loadTasks();
    }, []);

    // taskList güncellendiğinde AsyncStorage kısmına yazmalık
    useEffect(() => {
        const saveTasks = async () => {
            try {
                await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
            } catch (error) {
                console.error("Error : ", error);
            }
        };

        saveTasks();
    }, [taskList]);

    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage verileri temizlendi.');
        } catch (error) {
            console.error('AsyncStorage temizleme hatası:', error);
        }
    };

    const addTask = () => {
        if (newTask.trim() !== "") {
            const newTaskItem = { date: currentDate, task: newTask };
            setTaskList([...taskList, newTaskItem]);
            setNewTask("");
        }
    };

    // Tarihe göre görevleri grupla
    const groupedTasks = taskList.reduce((grouped, task) => {
        const date = task.date;
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(task.task);
        return grouped;
    }, {});

    const renderItem = ({ item }) => (
        <View style={styles.taskBox} >
            <Text style={styles.taskText} >{item}</Text>
            <TouchableOpacity>
                <Iconx style={styles.taskEdit} name="dots-vertical" size={22} color={"black"} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Merhaba</Text>
            <View style={styles.topBox} >
                <Text style={styles.date} >Bugün, {currentDate} </Text>
                <TouchableOpacity style={styles.completedBox} onPress={clearAllData} >
                    <Text style={styles.completed} >Tamamlananlar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <View style={styles.inputBox} >
                    <TextInput style={styles.input} placeholder='Yeni Görev Yaz' value={newTask} onChangeText={setNewTask} maxLength={42} />
                </View>
                <TouchableOpacity style={styles.iconBox} onPress={addTask} >
                    <Icon name="send" size={18} color={"white"} />
                </TouchableOpacity>
            </View>

            {/* Görevleri tarihe göre gruplanmış şekilde listele */}
            {Object.keys(groupedTasks).map((date, index) => (
                <View key={index}>
                    <Text style={styles.groupBoxDate} >-{'>'} {date}</Text>
                    <FlatList
                        data={groupedTasks[date]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />
                </View>
            ))}
        </View>
    )
};

export default Main;