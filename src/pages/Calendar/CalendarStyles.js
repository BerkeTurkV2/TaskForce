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
    },
    addIcon:{
        position: 'absolute',
        bottom: 20,
        end: 20,
        borderWidth: 3,
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
        width: 300,
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
    }
});