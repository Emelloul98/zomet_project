import { StyleSheet,Dimensions, PixelRatio } from 'react-native'

export const globalStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
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
    },
    zomet_text: {
        color:'#231dd3',
    }
})



