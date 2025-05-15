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
    { id: 1, title: "Task 1", category: "Category 1", isChecked: false },
    { id: 2, title: "Task 2", category: "Category 2", isChecked: true },
    { id: 3, title: "Task 3", category: "Category 3", isChecked: false },
    { id: 4, title: "Task 4", category: "Category 2", isChecked: true },
  ]);

  const handleAddTask = (title: string, category: string) => {
    const nextId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { id: nextId, title, category, isChecked: false }]);
  };

  return (
    <View className="flex-1 flex justify-between bg-background">
      <View className="flex flex-row justify-center">
        <Text className="pt-20 text-foreground font-bold text-6xl">
          HallPass
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      >
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ScrollView>
      <View className="relative flex items-center">
        <AddTask onAdd={handleAddTask} />
      </View>
    </View>
  );
}
