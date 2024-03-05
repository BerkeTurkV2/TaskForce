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
        elevation: 12,
    },
    noteBox: {
        flex: 1,
        marginTop: 10,
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 12,
        marginVertical: 8,
        paddingLeft: 10,
    },
    buttonBox: {
        backgroundColor: colors.primary,
        width: Dimensions.get("window").width / 4,
        alignSelf: "center",
        borderRadius: 16,
        marginTop: 2,
        marginBottom: 20,
    },
    addButton: {
        textAlign: "center",
        padding: 10,
        color: "white",
    },
    itemBox: {
        flexDirection: "row",
        marginTop: 40,
        marginRight: 20,
        marginLeft: 10
    },
    eventTitle: {
        flex: 1,
        fontWeight: "bold",
    },
    icon: {
        paddingLeft: 10,
    }
});