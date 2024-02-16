import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BouncyCheckbox from "react-native-bouncy-checkbox";

import Icon from "react-native-vector-icons/Ionicons";
import Iconx from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./MainStyles";

function Main({ navigation }) {
    const [currentDate, setCurrentDate] = useState("");
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [up, setUp] = useState(false);

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

    useEffect(() => {
        const loadCompletedTasks = async () => {
            try {
                const savedCompletedTasks = await AsyncStorage.getItem('completedTasks');
                if (savedCompletedTasks) {
                    const parsedCompletedTasks = JSON.parse(savedCompletedTasks);
                    setCompletedTasks(parsedCompletedTasks);
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        loadCompletedTasks();
    }, []);

    // Tamamlanan görevler değiştiğinde AsyncStorage'de güncelleme yap
    useEffect(() => {
        const saveCompletedTasks = async () => {
            try {
                await AsyncStorage.setItem('completedTasks', JSON.stringify(completedTasks));
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        saveCompletedTasks();
    }, [completedTasks]);

    const addTask = () => {
        if (newTask.trim() !== "") {
            const newTaskItem = { date: currentDate, task: newTask };
            setTaskList(prevList => [newTaskItem, ...prevList].sort((a, b) => new Date(b.date) - new Date(a.date)));
            setNewTask("");
        }
    };

    const deleteTask = (date, task) => {
        const updatedTasks = taskList.filter(item => !(item.date === date && item.task === task));
        setTaskList(updatedTasks);
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

    const goToCompleted = () => {
        navigation.navigate("Completed");
    };
    const renderItem = ({ item, date }) => {
        const handleCheckboxPress = async () => {
            setUp(false);
            if (true) {
                setTimeout(() => {
                    // Görev tamamlandığında AsyncStorage'deki tamamlananlar listesine ekle
                    const completedTask = { date: date, task: item };
                    setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, completedTask]);

                    // Ana görev listesinden kaldırma işlemini gerçekleştir ve güncelleme yap
                    const updatedTasks = taskList.filter(t => !(t.date === date && t.task === item));
                    setTaskList(updatedTasks);
                    setUp(true);
                }, 400);
            }
        };

        return (
            <View style={styles.taskBox}>
                <View style={{ flexDirection: "row" }}>
                        <BouncyCheckbox
                            size={25}
                            fillColor="#344e41"
                            unfillColor="#FFFFFF"
                            text={item}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ color: "black", fontSize: 14 }}
                            disableBuiltInState={up}
                            onPress={handleCheckboxPress}
                        />
                </View>
                <TouchableOpacity onPress={() => deleteTask(date, item)}>
                    <Iconx style={styles.taskEdit} name="delete-sweep-outline" size={20} color={"black"} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Merhaba</Text>
            <View style={styles.topBox} >
                <Text style={styles.date} >Bugün, {currentDate} </Text>
                <TouchableOpacity style={styles.completedBox} onPress={goToCompleted} >
                    <Text style={styles.completed} >Tamamlananlar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <View style={styles.inputBox} >
                    <TextInput style={styles.input} placeholder='Yeni Görev Yaz' value={newTask} onChangeText={setNewTask} maxLength={40} />
                </View>
                <TouchableOpacity style={styles.iconBox} onPress={addTask} >
                    <Icon name="send" size={18} color={"white"} />
                </TouchableOpacity>
            </View>
            {/* Görevleri tarihe göre gruplanmış şekilde listele */}
            <FlatList
                data={Object.keys(groupedTasks)}
                keyExtractor={(date, index) => index.toString()}
                renderItem={({ item: dateKey }) => (
                    <View>
                        <View style={styles.groupBox}>
                            <Iconx name="calendar-text" color="black" size={18} />
                            <Text style={styles.groupBoxDate}> {dateKey}</Text>
                        </View>
                        <FlatList
                            data={groupedTasks[dateKey]}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => renderItem({ item, date: dateKey })}
                        />
                    </View>
                )}
            />
        </View>
    )
};

export default Main;