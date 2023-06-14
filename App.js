// App.js
import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddItemScreen from './src/components/AddItemsScreen';
import ListScreen from './src/components/ListScreen';
import DetailScreen from './src/components/DetailScreen';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './src/components/home';


const Stack = createStackNavigator();
function MyStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#8C60C6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        initialRouteName='Home'
      >
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen 
        name="AddItemScreen" 
        component={AddItemScreen} 
        options={{ title: 'Adicionar Item' }}
      />
      <Stack.Screen 
        name="ListScreen" 
        component={ListScreen} 
        options={{ title: 'Listagem', headerLeft: (props)=><Icon.Button name="plus-circle" backgroundColor={"#0000"} onPress={()=>navigation.navigate('AddItemScreen')}/> }}
      />
      <Stack.Screen 
       name="DetailScreen" 
       component={DetailScreen} 
       options={{ title: 'Detalhes' }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}