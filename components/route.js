import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import CreateNote from './CreateNote';
import ViewNote from './ViewNote';
import EditNote from './EditNote';

const Stack = createStackNavigator();

export default function Route (){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Notas Rápidas' }} />
        <Stack.Screen name="CreateNote" component={CreateNote} options={{ title: 'Criar Nota' }} />
        <Stack.Screen name="ViewNote" component={ViewNote} options={{ title: 'Visualizar Nota' }} />
        <Stack.Screen name="EditNote" component={EditNote} options={{ title: 'Editar Nota'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

