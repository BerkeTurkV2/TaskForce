import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated, Alert, ActivityIndicator } from 'react-native';
import styles from "./CompletedStyles";
import CompletedTasks from '../../components/CompletedTasks/CompletedTasks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../assets/colors/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Completed() {
    const [completedList, setCompletedList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Animasyon değerleri
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        const loadTasks = async () => {
            setIsLoading(true);
            try {
                const completedTasksString = await AsyncStorage.getItem('completedTasks');
                if (completedTasksString) {
                    const completedTasks = JSON.parse(completedTasksString);
                    setCompletedList(completedTasks);
                }
            } catch (error) {
                console.error("Error : ", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTasks();
        
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

    const clearData = () => {
        Alert.alert(
            "Tamamlanan Görevleri Temizle",
            "Tüm tamamlanan görevleri silmek istediğinize emin misiniz?",
            [
                {
                    text: "İptal",
                    style: "cancel"
                },
                { 
                    text: "Temizle", 
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            await AsyncStorage.removeItem('completedTasks');
                            setCompletedList([]);
                            console.log("Veriler başarıyla silindi.");
                        } catch (error) {
                            console.error("Verileri silerken bir hata oluştu:", error);
                        } finally {
                            setIsLoading(false);
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
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
                <Icon name="check-all" size={60} color={colors.primary} />
                <Text style={styles.emptyListText}>Henüz tamamlanmış görev bulunmuyor</Text>
                <Text style={[styles.emptyListText, { marginTop: 5 }]}>Tamamladığınız görevler burada görünecek</Text>
            </View>
        );
    };

    return (
        <Animated.View 
            style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tamamlanan Görevler</Text>
                <Icon name="check-circle-outline" size={24} color={colors.primary} />
            </View>
            
            <FlatList
                data={completedList.slice().reverse()}
                keyExtractor={(item, index) => `completed-${index}`}
                renderItem={({ item, index }) => {
                    // Her öğe için yeni bir animasyon değeri
                    const itemAnim = new Animated.Value(0);
                    
                    // Öğe görünür olduğunda animasyon başlat
                    Animated.timing(itemAnim, {
                        toValue: 1,
                        duration: 500,
                        delay: index * 100, // Her öğe için kademeli gecikme
                        useNativeDriver: true
                    }).start();
                    
                    return (
                        <Animated.View style={{ opacity: itemAnim }}>
                            <CompletedTasks task={item.task} currentDate={item.currentDate} />
                        </Animated.View>
                    );
                }}
                ListEmptyComponent={renderEmptyList}
                contentContainerStyle={[styles.listContainer, 
                    completedList.length === 0 ? { flex: 1 } : null]}
                showsVerticalScrollIndicator={false}
            />
            
            {completedList.length > 0 && (
                <TouchableOpacity 
                    style={styles.buttonBox} 
                    onPress={clearData}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Görevleri Temizle</Text>
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

export default Completed;
