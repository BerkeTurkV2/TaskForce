import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    cardContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 14,
        marginTop: 2,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    date: {
        textAlign: "center",
        color: "#233322",
        fontSize: 12,
        fontWeight: "bold",
        padding: 2,
    },
    dateBox: {
        alignSelf: "center",
        width: Dimensions.get("screen").width / 1.6,
        backgroundColor: "white",
        borderRadius: 4,
        borderWidth: 2,
    },
    timeBody: {
        flexDirection: "row",
        justifyContent: "center",
    },
    timeBox: {
        alignItems: "center",
        margin: 4,
    },
    timeTitles: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    },
    remainingTimes: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    overlay: {
        justifyContent: "space-between",
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: Dimensions.get("screen").height / 5,
    },
    backgroundImage: {
        backgroundColor: "#e5e5e5",
        width: Dimensions.get("screen").width / 1.1,
        height: Dimensions.get("screen").height / 5,
    },
});