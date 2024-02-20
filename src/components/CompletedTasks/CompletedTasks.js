import React from 'react'
import { View, Text } from 'react-native';

import styles from "./CompletedTasksStyles";

function CompletedTasks({task, currentDate}) {
    return(
        <View style={styles.container} >
            <Text style={styles.taskText}> {task} </Text>
            <Text style={styles.taskDate} > {currentDate} </Text>
            <View style={styles.separator} />
        </View>
    )
};

export default CompletedTasks;