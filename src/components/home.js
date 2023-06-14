import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Button, Card } from 'react-native-paper';


export default function Home() {
    const navigation = useNavigation();
    return (
        <View style={[styles.container]}>
            <View style={styles.containerLogo}>
                <Card style={[styles.imagem]}>
                    <Card.Cover source={require('../img/logo.png')} />
                </Card>
                <Text>PURPLE</Text>
                <Button  style={[styles.button]} title='Entrar' onPress={() => { navigation.navigate("ListScreen") }}>Entrar</Button>

            </View>
        </View>


    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'

    },
    containerLogo: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
    containerForm: {
        flex: 1,
        backgroundColor: "#ECDFFC",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%",
        marginLeft: "2%",
        marginRight: "2%",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: "20%",
        marginBottom: 10,
        color: "#8C60C6",
        textAlign: "center"
    },
    text: {
        color: "#CEB3F2",
    },
    button: {
        padding: 10,
        borderRadius: 10,
        height: 40,
        margin: 12,
        backgroundColor: '#ceb3f2',
        borderColor: 'black',
    },
    imagem:{
        width: '500px',
    }

});