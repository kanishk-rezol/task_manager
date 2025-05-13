import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTaskStatus } from '../redux/tasksSlice';

const PendingTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <View style={styles.container}>
      <FlatList
        data={pendingTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={{fontSize:18}}>{item.title}</Text>
            <Text style={styles.textdata}>Status: <Text style={{ color: 'red' }}>Pending</Text></Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => dispatch(toggleTaskStatus(item.id))}
            >
              <Text style={styles.buttonText}>Completed</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  taskItem: {
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    width: '100%',
  },
  textdata: {
    marginLeft: 2,
    fontSize: 16,
  },
  button: {
    // backgroundColor: '#4CAF50',
    backgroundColor:'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width:150,
    marginLeft:230,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PendingTasks;
