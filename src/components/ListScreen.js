// screens/UserScreen.js
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import ListItem from './ListItem';
import firebase from '../../services/connectionFirebase';

class ListScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('agenda');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }
  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { materia, professor, data, descricao } = res.data();
      userArr.push({
        key: res.id,
        res,
        materia,
        professor,
        data,
        descricao,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
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
          {
            this.state.userArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  title={item.materia}
                  subtitle={item.professor}
                  onPress={() => {
                    this.props.navigation.navigate('DetailScreen', {
                      userkey: item.key
                    });
                  }}/>
              );
            })
          }
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22,
   backgroundColor: "#8C60C6",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',

  }
})
export default ListScreen;