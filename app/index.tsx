import * as React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native";
import AddTask from "~/components/ui/AddTask";
import Logo from "~/components/ui/logo";
import Task from "../components/ui/task";

interface TaskItem {
  id: number;
  title: string;
  category: string;
  isChecked: boolean;
}

export default function HomeScreen() {
  const [tasks, setTasks] = React.useState<TaskItem[]>([
  ]);

  const handleAddTask = (title: string, category: string) => {
    const nextId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { id: nextId, title, category, isChecked: false }]);
  };
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };


  return (
    <View className="flex-1 flex justify-between bg-background">
      <View className="flex flex-row justify-center">
        <Text className="pt-20 text-foreground font-bold text-6xl">
          HallPass
        </Text>
      </View>
      <ScrollView className="h-20 mt-20 mb-40"
      >
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </ScrollView>
      <View className="relative flex items-center">
        <AddTask onAdd={handleAddTask} />
      </View>
    </View>
  );
}
