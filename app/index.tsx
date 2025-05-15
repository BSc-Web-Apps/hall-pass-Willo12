import * as React from "react";
import { View } from "react-native";
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

  return (
    <View className="flex-1 justify-center items-center gap-5 bg-background">
      <Logo />
      <View className="flex-1 justify-center items-center bg-background">
        {tasks.map((task) => (
          <Task task={task} />
        ))}
      </View>
      <View className="flex items-center">
        <AddTask onAdd={handleAddTask} />
      </View>
    </View >
  );
}
