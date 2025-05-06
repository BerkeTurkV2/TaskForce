import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Animated, Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BouncyCheckbox from "react-native-bouncy-checkbox";

import Icon from "react-native-vector-icons/Ionicons";
import Iconx from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./MainStyles";
import { colors } from "../../assets/colors/colors";

function Main({ navigation }) {
    const [currentDate, setCurrentDate] = useState("");
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [up, setUp] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Animasyon değerleri
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        const getCurrentDate = () => {
            const date = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('tr-TR', options);

            setCurrentDate(formattedDate);
        };

        getCurrentDate();

        // Sayfa yüklendiğinde animasyon başlat
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true
            })
        ]).start();
    }, []);

    // AsyncStorageden veriyi almalik kısım
    useEffect(() => {
        const loadTasks = async () => {
            setIsLoading(true);
            try {
                const savedTasks = await AsyncStorage.getItem('taskList');
                if (savedTasks) {
                    const parsedTasks = JSON.parse(savedTasks);
                    setTaskList(parsedTasks);
                }
            } catch (error) {
                console.error("Error : ", error);
            } finally {
                setIsLoading(false);
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
            Keyboard.dismiss();
            const newTaskItem = { date: currentDate, task: newTask, id: Date.now().toString() };

            // Yeni görev animasyonu
            const newTaskAnim = new Animated.Value(-50);
            newTaskItem.anim = newTaskAnim;

            setTaskList(prevList => [newTaskItem, ...prevList].sort((a, b) => new Date(b.date) - new Date(a.date)));
            setNewTask("");

            // Yeni görev eklendiğinde animasyon başlat
            Animated.spring(newTaskAnim, {
                toValue: 0,
                friction: 5,
                tension: 40,
                useNativeDriver: true
            }).start();
        }
    };

    const deleteTask = (date, task) => {
        const updatedTasks = taskList.filter(item => !(item.date === date && item.task === task));
        setTaskList(updatedTasks);
    };

    const goToCompleted = () => {
        navigation.navigate("Completed");
    };

    const renderItem = ({ item, date }) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const currentDate = new Date().toLocaleDateString('tr-TR', options);
        const handleCheckboxPress = async () => {
            setUp(false);

            // Tamamlanan görev animasyonu
            const taskOpacity = new Animated.Value(1);
            const taskScale = new Animated.Value(1);

            Animated.parallel([
                Animated.timing(taskOpacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(taskScale, {
                    toValue: 0.8,
                    duration: 500,
                    useNativeDriver: true
                })
            ]).start(() => {
                // Görev tamamlandığında AsyncStorage'deki tamamlananlar listesine ekle
                const completedTask = { task: item, currentDate: currentDate };
                setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, completedTask]);

                // Ana görev listesinden kaldırma işlemini gerçekleştir ve güncelleme yap
                const updatedTasks = taskList.filter(t => !(t.date === date && t.task === item));
                setTaskList(updatedTasks);
                setUp(true);
            });
        };

        // Animasyon değeri
        const animatedStyle = {
            transform: [{ translateX: item.anim || 0 }]
        };

        return (
            <Animated.View style={[styles.taskBox, animatedStyle]}>
                <View style={styles.taskContent}>
                    <BouncyCheckbox
                        size={25}
                        fillColor={colors.primary}
                        unfillColor="#FFFFFF"
                        text={item}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ color: "#333", fontSize: 16, textDecorationLine: 'none', flex: 1 }}
                        disableBuiltInState={up}
                        onPress={handleCheckboxPress}
                        style={styles.checkboxContainer}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => deleteTask(date, item)}
                    style={{ padding: 8 }}
                >
                    <Iconx style={styles.taskEdit} name="delete-sweep-outline" size={22} color={colors.primary} />
                </TouchableOpacity>
            </Animated.View>
        );
    };

    // Boş liste durumu için render fonksiyonu
    const renderEmptyList = () => {
        if (isLoading) {
            return (
                <View style={styles.emptyList}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.emptyListText}>Görevler yükleniyor...</Text>
                </View>
            );
        }

        return (
            <View style={styles.emptyList}>
                <Iconx name="clipboard-text-outline" size={60} color={colors.primary} />
                <Text style={styles.emptyListText}>Henüz görev eklenmemiş</Text>
                <Text style={[styles.emptyListText, { marginTop: 5 }]}>Yeni bir görev eklemek için yukarıdaki alanı kullanabilirsiniz</Text>
            </View>
        );
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

    return (
        <Animated.View
            style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Merhaba</Text>
                <TouchableOpacity
                    style={styles.completedBox}
                    onPress={goToCompleted}
                    activeOpacity={0.7}
                >
                    <Text style={styles.completed}>Tamamlananlar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topBox}>
                <Text style={styles.date}>Bugün, {currentDate}</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder='Yeni Görev Yaz'
                        placeholderTextColor="#999"
                        value={newTask}
                        onChangeText={setNewTask}
                        maxLength={37}
                        returnKeyType="send"
                        onSubmitEditing={addTask}
                    />
                </View>
                <TouchableOpacity
                    style={styles.iconBox}
                    onPress={addTask}
                    activeOpacity={0.7}
                >
                    <Icon name="send" size={20} color={"white"} />
                </TouchableOpacity>
            </View>

            {/* Görevleri tarihe göre gruplanmış şekilde listele */}
            {Object.keys(groupedTasks).length === 0 && !isLoading ? (
                renderEmptyList()
            ) : (
                <FlatList
                    data={Object.keys(groupedTasks)}
                    keyExtractor={(date, index) => `date-${index}`}
                    renderItem={({ item: dateKey }) => (
                        <View>
                            <View style={styles.groupBox}>
                                <Iconx name="calendar-text" color={colors.primary} size={20} />
                                <Text style={styles.groupBoxDate}>{dateKey}</Text>
                            </View>
                            <FlatList
                                data={groupedTasks[dateKey]}
                                keyExtractor={(item, index) => `task-${index}`}
                                renderItem={({ item }) => renderItem({ item, date: dateKey })}
                            />
                        </View>
                    )}
                    ListEmptyComponent={renderEmptyList}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </Animated.View>
    )
};

export default Main;