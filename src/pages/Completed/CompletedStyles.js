import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../assets/colors/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyListText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 10,
    },
    buttonBox: {
        backgroundColor: colors.primary,
        width: Dimensions.get("window").width / 2.2,
        alignSelf: 'center',
        margin: 16,
        borderRadius: 24,
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
    buttonText: {
        color: "white",
        fontSize: 14,
        textAlign: "center",
        fontWeight: "bold",
        padding: 12,
    },
    listContainer: {
        paddingBottom: 16,
    }
});