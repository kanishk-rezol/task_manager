import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, Text, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';

const AddTaskScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!title.trim()) {
      setError('Enter some task');
      return;
    }

    setError('');
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    dispatch(addTask(newTask));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.textinput, styles.shadow]}>
        <TextInput
          style={styles.inputtext}
          placeholder="Task Title"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (error) setError('');
          }}
          multiline={true} 
          numberOfLines={4} 
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={[styles.buttoncontiner, styles.shadow]}>
        <Button title="Add Task" onPress={handleAddTask} />
      </View>
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textinput: {
    backgroundColor: 'white',
    width: '90%',
    height: 200, 
    borderWidth: 0.2,
    borderColor: 'black',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    marginLeft:10
  },
  inputtext: {
    fontSize: 15,
    width: '100%',
    height: '100%', 
    textAlignVertical: 'top', 
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  buttoncontiner: {
    marginTop: 140,
    backgroundColor: 'white',
    width: 100,
    alignSelf: 'center',
    borderRadius: 20,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
