import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../assets/colors/colors';

import styles from "./CompletedTasksStyles";

function CompletedTasks({task, currentDate}) {
    return(
        <View style={styles.container}>
            <Icon name="check-circle" size={20} color={colors.primary} style={styles.completedIcon} />
            <Text style={styles.taskText}>{task}</Text>
            <Text style={styles.taskDate}>{currentDate}</Text>
            <View style={styles.separator} />
        </View>
    )
};

export default CompletedTasks;