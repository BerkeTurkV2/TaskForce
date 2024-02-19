import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 8,
        backgroundColor: "#a3b18a",
    },
    taskText: {
        fontWeight: 'bold',
        paddingTop: 6,
        paddingLeft: 6
    },
    taskDate: {
        fontSize: 11,
        textAlign: 'right',
        paddingRight: 4,
        paddingTop: 2
    },
    separator: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        marginTop: 4,
    }
});