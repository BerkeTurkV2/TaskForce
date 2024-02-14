import React from 'react';
import { View, Text, FlatList } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Completed() {

    return (
        <View >
            <Text >Tamamlanan Görevler</Text>
            <FlatList
                data={null}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.task}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default Completed;
