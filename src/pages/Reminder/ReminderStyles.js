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
    emptyContainer: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
    },
    emptyTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    agendaContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 16,
        elevation: 16,
    },
    noteBox: {
        flex: 1,
        marginTop: 10,
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 12,
        marginVertical: 8,
        paddingLeft: 10
    },
    buttonBox: {
        backgroundColor: "#5d7e5c",
        width: Dimensions.get("window").width / 4,
        alignSelf: "center",
        borderRadius: 16,
        marginTop: 2,
    },
    addButton: {
        textAlign: "center",
        padding: 10,
        color: "white",
    },
    itemBox: {
        marginTop: 40,
        marginRight: 20,
        marginLeft: 10
    },
    eventTitle: {
        fontWeight: "bold",
    }
});