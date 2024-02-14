import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    row: {
        flexDirection: 'row',
    },
    title: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    topBox: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    date: {
        color: "#344e41",
        fontWeight: "bold",
    },
    completed: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
    },
    completedBox: {
        backgroundColor: "#588157",
        padding: 8,
        borderRadius: 14,
    },
    inputBox: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 0.6,
        borderColor: "gray",
        borderRadius: 16,
        marginVertical: 16,
        backgroundColor: "white"
    },
    input: {
        paddingLeft: 16,
        paddingRight: 6,
        flex: 1
    },
    button: {
        backgroundColor: "white",
        height: 30,
        justifyContent: "center",
        alignSelf: "center",
        paddingHorizontal: 10,
        marginRight: 6,
        borderRadius: 12,
    },
    iconBox: {
        justifyContent: "center",
        alignSelf: "center",
        padding: 10,
        borderWidth: 0.6,
        height: 40,
        marginLeft: 6,
        borderRadius: 28,
        backgroundColor: "#588157"
    },
    taskBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#a3b18a",
        padding: 8,
        marginBottom: 10,
        borderRadius: 12,
    },
    groupBox:{
        flexDirection: "row",  
        alignItems: "center", 
        marginBottom: 8, 
        marginLeft: 4 
    },
    groupBoxDate: {
        color: "black",
    },
    taskText: {
        padding: 4,
        color: "black",
    },
    taskEdit: {
        paddingRight: 6,
    },
});
