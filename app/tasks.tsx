
import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";

import Task from "~/components/ui/task";


export default function TaskScreen() {

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

    <View className="flex-1 justify-center items-center bg-background">
      {tasks.map((task) => (
        <Task task={task} />
      ))}
    </View>
  );
}
