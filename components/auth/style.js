import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollview: {
        padding: 20,
    },
    image:{
        marginTop: 150,
        marginBottom: 100,
        alignSelf: 'center'
    },
    input:{
        backgroundColor: '#ddd',
        borderRadius: 50,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
        flex: 1,
    },
    error: {        
        marginTop: -5,
        marginBottom: 10,
        textAlign: 'center',
        color: 'red'
    },
    button: {
        borderRadius: 50,
        marginBottom: 10,
        paddingVertical: 15,
        backgroundColor: '#fe4735'
    },
    textButton: {
        color: '#fff',
        textAlign: 'center'
    },    
    linkButton: {
        paddingVertical: 15,
    },
    textLink: {
        color: '#fe4735',
        textAlign: 'center'
    }
});