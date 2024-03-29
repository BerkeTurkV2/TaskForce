import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../assets/colors/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonBox: {
        backgroundColor: colors.primary,
        width: Dimensions.get("window").width / 2.5,
        alignSelf: 'flex-end',
        margin: 8,
        borderRadius: 16,
    },
    buttonText: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold",
        padding: 8,
    }
});