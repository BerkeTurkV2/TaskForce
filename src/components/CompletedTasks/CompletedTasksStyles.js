import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../assets/colors/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: 'white',
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    taskText: {
        color: '#333',
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 6,
    },
    taskDate: {
        fontSize: 13,
        color: '#666',
        textAlign: 'right',
        fontStyle: 'italic',
        marginTop: 4,
    },
    separator: {
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginTop: 8,
    },
    completedIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
    }
});