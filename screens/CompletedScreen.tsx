import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTaskStatus, deleteTask } from '../redux/tasksSlice';
import Icon from 'react-native-vector-icons/Feather';

const CompletedTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <View style={styles.container}>
      {completedTasks.length === 0 ? (
        <Text style={styles.emptyText}>No completed tasks</Text>
      ) : (
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <Text style={styles.textdata}>
                Status: <Text style={{ color: 'green' }}>Completed</Text>
              </Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => dispatch(deleteTask(item.id))}>
                  <Icon name="trash-2" size={22} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => dispatch(toggleTaskStatus(item.id))}
              >
                <Text style={styles.buttonText}>Mark as Pending</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CompletedTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    width: '100%',
    borderRadius: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
  },
  textdata: {
    marginTop: 5,
    fontSize: 16,
  },
  deleteButton:{
    position:'relative',
    marginTop:0,
    top:20,
    left:5,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 150,
    alignSelf: 'flex-end',
    position:'relative',
    bottom:10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
});
