import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    row: {
        flexDirection: 'row',
    },
    title: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    date: {
        color: "black",
        fontWeight: "bold",
    },
    completed: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
    },
    completedBox: {
        backgroundColor: "blue",
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
        backgroundColor: "#f5e5ec"
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
        backgroundColor: "#bc46bc"
    },
    taskBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "gray",
        padding: 8,
        marginBottom: 10,
        borderRadius: 12,
    }
});
