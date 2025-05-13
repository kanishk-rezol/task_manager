import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTaskStatus } from '../redux/tasksSlice';

const TaskDetailScreen = ({ route }: any) => {
  const { taskId } = route.params;
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task.id === taskId)
  );
  const dispatch = useDispatch();

  if (!task) {
    return <Text>Task not found</Text>;
  }

  return (
    <View>
      <Text>Title: {task.title}</Text>
      <Text>Status: {task.completed ? 'Completed' : 'Pending'}</Text>
      <Button
        title={`Mark as ${task.completed ? 'Pending' : 'Completed'}`}
        onPress={() => dispatch(toggleTaskStatus(task.id))}
      />
    </View>
  );
};

export default TaskDetailScreen;
