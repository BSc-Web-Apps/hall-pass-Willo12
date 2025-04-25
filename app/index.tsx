import * as React from "react";
import { View } from "react-native";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Logo from "~/components/ui/logo";
import Task from "~/components/ui/task";
import { Text } from "~/components/ui/text";

export default function HomeScreen() {

  const [tasks, setTasks] = React.useState([
    {
      title: "task 1", category: "Category 1", isChecked: false, id: 1
    },
    {
      title: "task 2", category: "Category 2", isChecked: false, id: 2
    },
    {
      title: "task 3", category: "Category 3", isChecked: false, id: 3
    },

  ]);


  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-background">
      <Logo />
      {tasks.map((task) => (
        <Task task={task} />
      ))}

    </View >
  );
}
