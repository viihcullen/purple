// screens/UserDetailScreen.js
import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../services/connectionFirebase';
class DetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      materia: '',
      professor: '',
      data: '',
      descricao: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('agenda').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const agenda = res.data();
        this.setState({
          key: res.id,
          materia: agenda.materia,
          professor: agenda.professor,
          data: agenda.data,
          descricao: agenda.descricao,
          isLoading: false
        });
      } else {
        console.log("Produto não existe");
      }
    });
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('agenda').doc(this.state.key);
    updateDBRef.set({
      materia: this.state.materia,
      professor: this.state.professor,
      data: this.state.data,
      descricao: this.state.descricao,
    }).then((docRef) => {
      this.setState({
        key: '',
        materia: '',
        professor: '',
        data: '',
        descricao: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ListScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
  deleteUser() {
    const dbRef = firebase.firestore().collection('agenda').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removido do Banco de Dados')
          this.props.navigation.navigate('ListScreen');
      })
  }
  openTwoButtonAlert=()=>{
    Alert.alert(
      'Deletar produto',
      'Você tem certeza?',
      [
        {text: 'Sim', onPress: () => this.deleteUser()},
        {text: 'Não', onPress: () => console.log('Item não removido'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#8C60C6"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Item'}
              value={this.state.materia}
              onChangeText={(val) => this.inputValueUpdate(val, 'materia')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Descrição'}
              value={this.state.professor}
              onChangeText={(val) => this.inputValueUpdate(val, 'professor')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Preço'}
              value={this.state.data}
              onChangeText={(val) => this.inputValueUpdate(val, 'data')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'descricao'}
              value={this.state.descricao}
              onChangeText={(val) => this.inputValueUpdate(val, 'descricao')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.updateUser()} 
            color="#CEB3F2"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#8C60C6"
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CEB3F2',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  }
})
export default DetailScreen;