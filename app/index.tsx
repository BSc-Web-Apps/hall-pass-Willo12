import * as React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native";
import AddTask from "~/components/ui/AddTask";
import Logo from "~/components/ui/logo";
import Task from "../components/ui/task";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TaskItem {
  id: number;
  title: string;
  category: string;
  isChecked: boolean;
}

const TASKS_STORAGE_KEY = '@hall_pass_tasks';

export default function HomeScreen() {
  const [tasks, setTasks] = React.useState<TaskItem[]>([]);

  // Load tasks from storage on component mount
  React.useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to storage whenever they change
  React.useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  const handleAddTask = (title: string, category: string) => {
    const nextId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { id: nextId, title, category, isChecked: false }]);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleUpdateTask = (updatedTask: TaskItem) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  return (
    <View className="flex-1 flex justify-between bg-background">
      <View className="flex flex-row justify-center">
        <Text className="pt-20 text-foreground font-bold text-6xl">
          HallPass
        </Text>
      </View>
      <ScrollView className="max-h-96 -translate-y-16"

      >
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        ))}
      </ScrollView>
      <View className="relative flex items-center">
        <AddTask onAdd={handleAddTask} />
      </View>
    </View>
  );
}
