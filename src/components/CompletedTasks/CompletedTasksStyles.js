import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 12,
        backgroundColor: "#a3b18a",
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderWidth: 0.8,
    },
    taskText: {
        color: "black",
        fontWeight: 'bold',
        paddingTop: 6,
        paddingLeft: 10
    },
    taskDate: {
        fontSize: 11,
        textAlign: 'right',
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 2,
    },
    separator: {
        //borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: 4,
    }
});