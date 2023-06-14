// screens/AddUserScreen.js
import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../services/connectionFirebase';

const Separator = () => {
    return <View style={styles.separator} />;
  }
class AddItemScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('agenda');
    this.state = {
        materia: '',
        professor: '',
        data: '',
        descricao: '',
      isLoading: false
    };
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  storeUser() {
    if(this.state.name === ''){
     alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        materia: this.state.materia,
      professor: this.state.professor,
      data: this.state.data,
      descricao: this.state.descricao,
      }).then((res) => {
        this.setState({
            materia: '',
            professor: '',
            data: '',
            descricao: '',
          isLoading: false,
        });
        this.props.navigation.navigate('ListScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
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
              placeholder={'Matéria'}
              value={this.state.materia}
              onChangeText={(val) => this.inputValueUpdate(val, 'materia')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Professor'}
              value={this.state.professor}
              onChangeText={(val) => this.inputValueUpdate(val, 'professor')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Data'}
              value={this.state.data}
              onChangeText={(val) => this.inputValueUpdate(val, 'data')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Descrição'}
              value={this.state.descricao}
              onChangeText={(val) => this.inputValueUpdate(val, 'descricao')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Adicionar'
            onPress={() => this.storeUser()} 
            color="#CEB3F2"
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
  separator:{
    marginBottom: 10
  }
})
export default AddItemScreen;