import React, { useEffect, useRef } from 'react';
import {View,Text,Button,StyleSheet,Animated,Dimensions,TouchableOpacity} 
from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setTasks } from '../redux/tasksSlice';
import { fetchTasks } from '../api/tasksApi';

const { width, height } = Dimensions.get('window');

const getRandomPosition = () => ({
  top: Math.random() * (height - 300),
  left: Math.random() * (width - 200),
});

const getRandomOffset = () => ({
  x: Math.random() * 300 - 150,
  y: Math.random() * 300 - 150,
});

const getRandomDuration = () => 3000 + Math.random() * 4000;

const AnimatedTask = ({
  item,
  style,
  backgroundColor,
  pointerEvents = 'none',
}: {
  item: any;
  style: any;
  backgroundColor: string;
  pointerEvents?: 'none' | 'auto' | 'box-none' | 'box-only';
}) => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    const animate = () => {
      const offset = getRandomOffset();
      const duration = getRandomDuration();

      Animated.sequence([
        Animated.timing(position, {
          toValue: { x: offset.x, y: offset.y },
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: { x: 0, y: 0 },
          duration,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: position.getTranslateTransform(),
          backgroundColor,
        },
      ]}
      pointerEvents={pointerEvents}
    >
      <Text>{item.title}</Text>
    </Animated.View>
  );
};

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    const loadTasks = async () => {
      const fetched = await fetchTasks();
      dispatch(setTasks(fetched));
    };
    loadTasks();
  }, [dispatch]);

  const pendingTasks = tasks.filter((t) => !t.completed).slice(0, 4);
  const completedTasks = tasks.filter((t) => t.completed).slice(0, 5);

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {pendingTasks.map((item) => {
          const position = getRandomPosition();
          return (
            <AnimatedTask
              key={`pending-${item.id}`}
              item={item}
              backgroundColor="rgba(255, 0, 0, 0.4)"
              style={[
                styles.taskItem,
                {
                  position: 'absolute',
                  ...position,
                  borderColor: '#a00',
                },
              ]}
            />
          );
        })}

        {completedTasks.map((item) => {
          const position = getRandomPosition();
          return (
            <AnimatedTask
              key={`completed-${item.id}`}
              item={item}
              backgroundColor="rgba(0, 255, 0, 0.3)"
              style={[
                styles.taskItem,
                {
                  position: 'absolute',
                  ...position,
                  borderColor: '#0a0',
                },
              ]}
            />
          );
        })}
      </View>
      <Text style={styles.title}>Task Manager</Text>
      <Text style={{ textAlign:'center'}}> click task to check the task done or to be done</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('TaskTabs')}
        >
          <Text style={{margin:7,color:'white',fontSize:18}}>Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 350,
    marginBottom: 20,
    zIndex: 10,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    zIndex: 10,
    // borderWidth:1,
    borderRadius:10,
    backgroundColor:'rgb(0, 0, 0)',
    marginTop:20,
  },
  taskItem: {
    width: 160,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 1,
  },
});

export default HomeScreen;
