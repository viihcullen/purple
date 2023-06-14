import {Text,TouchableWithoutFeedback,StyleSheet,View} from 'react-native'

export default function ListItem(props){
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.container}>
            <Text style={styles.texto}>{props.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
 }

const styles = StyleSheet.create({
    container:{
        marginVertical: 13,
        backgroundColor: '#fff',
        padding: 10,
        margin: 30,
        opacity: .65,
        borderRadius: 5
    },
    texto:{
        textAlign: 'center',
        color: '#6f4f32'
    }
})