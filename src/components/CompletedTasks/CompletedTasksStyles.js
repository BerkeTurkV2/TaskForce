import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 12,
        backgroundColor: colors.secondary,
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderWidth: 0.8,
        borderBottomWidth: 3,
    },
    taskText: {
        color: "black",
        fontWeight: '500',
        paddingTop: 6,
        paddingLeft: 10
    },
    taskDate: {
        fontSize: 11,
        textAlign: 'right',
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 2,
    },
    separator: {
        borderBottomColor: 'black',
        marginTop: 4,
    }
});