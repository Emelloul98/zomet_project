import { StyleSheet } from 'react-native'

export const globalS = StyleSheet.create({
    container: {
        padding: 40
    },
    titleText: {
        fontFamily: "sevillana",
        fontSize: 18,
        color: "#333"
    },

    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        height: 70,
        width: 300,
    },
    error: {
        color: "crimson",
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 6,
        textAlign: "center"
    }

})
