import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assets/colors/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background
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
        marginBottom: 15,
    },
    addIcon:{
        position: 'absolute',
        bottom: 10,
        end: 20,
        borderWidth: 2,
        borderRadius: 32,
        elevation: 32,
        shadowColor: colors.primary
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
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
        backgroundColor: colors.tertiary,
        textAlign: "center",
        borderRadius: 12,
        borderWidth: 0.5,
        padding: 10,
        marginVertical: 10
    },
    addButton: {
        backgroundColor: colors.primary,
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