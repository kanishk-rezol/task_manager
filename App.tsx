import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PendingTasks from './screens/PendingScreen';
import CompletedTasks from './screens/CompletedScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TaskTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Pending" component={PendingTasks} 
      options={{
      headerStyle:{
        backgroundColor:"transparent"
      },
      headerTitleStyle:{
        color:'red',
        fontWeight:'bold',
      },
      tabBarLabel: ({ focused }) => (
        <Text style={{ fontSize:10, color: focused ? 'blue' : 'red' }}>Pending</Text>
      ),
      tabBarIcon: ({size }) => (
        <Icon name="close" size={size} color={'red'} />
      ),
    }}
    />
    <Tab.Screen name="Completed" component={CompletedTasks} 
    options={{
      headerStyle:{
        backgroundColor:"transparent"
      },
      headerTitleStyle:{
        color:'green',
        fontWeight:'bold',
      },
      tabBarLabel: ({ focused }) => (
        <Text style={{ fontSize:10, color: focused ? 'blue' : 'green' }}>Completed</Text>
      ),
      tabBarIcon: ({size }) => (
        <Icon name="checkmark" size={size} color={'green'} />
      ),
    }}
    />
    <Tab.Screen name="Add new Task" component={AddTaskScreen} 
    options={{
      headerStyle:{
        backgroundColor:"transparent"
      },
      headerTitleStyle:{
        // color:'red',
        fontWeight:'bold',
      },
      tabBarIcon:()=>(
        <Icon name='add' size={29} color={'black'} />
      ),
      tabBarLabel: ({focused})=>(
        <Text style={{fontSize:10, color: focused ? 'blue' : 'black'}}>AddTask </Text>
      ),
    }}/>
  </Tab.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{
            headerShown:false
          }}/>
          <Stack.Screen name="AddTask" component={AddTaskScreen}  />
          <Stack.Screen name="TaskDetails" component={TaskDetailScreen} />
          <Stack.Screen name="TaskTabs" component={TaskTabs} 
          options={{
            headerTitle:" ",
            headerStyle:{
            },
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
