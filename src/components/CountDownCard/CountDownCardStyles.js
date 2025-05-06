import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../assets/colors/colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    cardContainer: {
        alignSelf: 'center',
        marginBottom: 24,
        borderRadius: 20,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    title: {
        flex: 1,
        fontSize: 18,
        paddingHorizontal: 16,
        marginTop: 4,
        color: "white",
        fontWeight: "bold",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    date: {
        textAlign: "center",
        color: "#333",
        fontSize: 14,
        fontWeight: "600",
        padding: 8,
    },
    dateBox: {
        alignSelf: "center",
        width: width * 0.7,
        backgroundColor: "white",
        borderRadius: 16,
        marginBottom: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    timeBody: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    timeBox: {
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        minWidth: width * 0.18,
        margin: 4,
    },
    timeTitles: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        marginBottom: 4,
    },
    remainingTimes: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    overlay: {
        justifyContent: "space-between",
        borderRadius: 20,
        overflow: 'hidden',
        height: height / 4.5,
    },
    backgroundImage: {
        width: width * 0.9,
        height: height / 4.5,
    },
    deleteButton: {
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        marginRight: 8,
    },
    expiredText: {
        color: '#FF5252',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 6,
    }
});