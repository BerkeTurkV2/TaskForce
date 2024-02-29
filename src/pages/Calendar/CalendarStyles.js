import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#eeeeee"
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black",
        paddingBottom: 8,
    },
    underTitle: {
        color: "black",
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addIcon:{
        position: 'absolute',
        bottom: 20,
        end: 20,
        borderWidth: 2,
        borderRadius: 32,
        elevation: 32,
        shadowColor: "#5d7e5c"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalBox: {
        backgroundColor: 'white',
        width: 340,
        padding: 20,
        borderRadius: 16
    },
    modalTitle: {
        textAlign: 'center',
        color: 'black',
        fontWeight: "bold",
        fontSize: 16,
        paddingBottom: 10
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 10,
    },
    acyivityName: {
        fontWeight: "bold",
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 12,
        marginVertical: 8,
        paddingLeft: 10
    },
    calenderTitle: {
        backgroundColor: "pink",
        textAlign: "center",
        borderRadius: 12,
        borderWidth: 0.5,
        padding: 10,
        marginVertical: 10
    },
    addButton: {
        backgroundColor: "#5d7e5c",
        width: Dimensions.get("window").width / 4,
        alignSelf: "center",
        borderRadius: 16
    },
    addButtonText: {
        textAlign: "center",
        padding: 10,
        color: "white"
    },
    closeButton: {
        position: "absolute",
        right: 16,
        top: 10,
    },
    selectedDate: {
        marginBottom: 10,
    }
});