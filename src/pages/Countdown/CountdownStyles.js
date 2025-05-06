import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../assets/colors/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    underTitle: {
        color: '#555',
        fontSize: 16,
        marginBottom: 20,
    },
    countdownList: {
        paddingBottom: 80, // Yeterli boşluk bırakarak + butonunun üzerine gelecek içeriği engelleme
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
    addIcon: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: 'white',
        borderRadius: 30,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    modalBox: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.9,
        padding: 24,
        borderRadius: 20,
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
    modalTitle: {
        textAlign: 'center',
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 16,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 20,
    },
    acyivityName: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 16,
        marginVertical: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    calenderTitle: {
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderRadius: 16,
        borderWidth: 0,
        padding: 14,
        marginVertical: 12,
        fontSize: 15,
        color: '#555',
    },
    dateWarning: {
        backgroundColor: 'rgba(255, 200, 200, 0.3)',
        borderColor: 'rgba(255, 100, 100, 0.5)',
        borderWidth: 1,
    },
    addButton: {
        backgroundColor: colors.primary,
        width: Dimensions.get('window').width * 0.4,
        alignSelf: 'center',
        borderRadius: 24,
        marginTop: 10,
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
    addButtonText: {
        textAlign: 'center',
        padding: 14,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeButton: {
        position: 'absolute',
        right: 16,
        top: 16,
        padding: 4,
    },
    selectedDate: {
        marginBottom: 16,
        textAlign: 'center',
        fontSize: 15,
        color: colors.primary,
        fontWeight: '500',
    }
});