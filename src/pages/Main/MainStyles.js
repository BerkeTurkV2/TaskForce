import { StyleSheet, Platform } from 'react-native';
import { colors } from "../../assets/colors/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: colors.primary,
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    topBox: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 12,
    },
    date: {
        color: "#333",
        fontWeight: "600",
        fontSize: 16,
    },
    completed: {
        color: "white",
        fontWeight: "bold",
        fontSize: 13,
    },
    completedBox: {
        backgroundColor: colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    inputBox: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 24,
        marginVertical: 16,
        backgroundColor: "white",
        height: 50,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    input: {
        paddingLeft: 20,
        paddingRight: 10,
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
    button: {
        backgroundColor: "white",
        height: 36,
        justifyContent: "center",
        alignSelf: "center",
        paddingHorizontal: 12,
        marginRight: 8,
        borderRadius: 18,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    iconBox: {
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        height: 48,
        width: 48,
        marginLeft: 8,
        marginRight: 4,
        borderRadius: 24,
        backgroundColor: colors.primary,
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
    taskBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
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
    groupBox:{
        flexDirection: "row",  
        alignItems: "center", 
        marginTop: 16,
        marginBottom: 12, 
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: 'rgba(88, 129, 87, 0.08)',
        borderRadius: 12,
    },
    groupBoxDate: {
        color: colors.primary,
        fontWeight: '600',
        fontSize: 15,
        marginLeft: 6,
    },
    taskText: {
        padding: 4,
        color: "#333",
        fontSize: 16,
        flex: 1,
    },
    taskEdit: {
        paddingHorizontal: 8,
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    taskContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
});
