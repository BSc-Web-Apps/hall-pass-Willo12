import * as React from "react";
import { Button, TouchableOpacity, View } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";
import { Text } from "~/components/ui/text";
import TaskDialog from "./TaskDialogue";
import { CrossIcon } from "lucide-react-native";

export interface Task {
  id: number;
  title: string;
  setTask: (task: Task) => void;
  category: string;
  isChecked: boolean;
}

export interface TaskProps {
  task: Task;
  onDelete: (taskId: number) => void;
}

export default function Task({ task: propTask, onDelete }: TaskProps) {
  const [task, setTask] = React.useState(propTask);
  const [showDialog, setShowDialog] = React.useState(false);
  const { title, category, isChecked } = task;

  const handleSetChecked = () => {
    const nextChecked = !task.isChecked;
    setTask({ ...task, isChecked: nextChecked });
  };


  const handleDelete = () => {
    onDelete(task.id);
  }

  return (
    <>
      <TouchableOpacity
        className="flex flex-row w-screen px-20 "
        delayLongPress={500}
        onLongPress={() => setShowDialog(true)}
      >
        <View className="px-8 pt-8 w-24 h-full">
          <Checkbox
            className="border-foreground checked:bg-foreground"
            checked={isChecked}
            onCheckedChange={handleSetChecked}
          />
        </View>
        <View className="py-4 flex gap-1 flex-1 h-full border-b border-foreground-transparent">
          <Text className="text-foreground text-xl">{title}</Text>
          <Text className="text-foreground-transparent text-xl">
            {category}
          </Text>
        </View>
        <View className="flex justify-center items-center">
          <TouchableOpacity onPress={handleDelete}>

            <CrossIcon fill={"#EF4444"} size={24} />
          </TouchableOpacity>


        </View>
      </TouchableOpacity>

      <TaskDialog
        task={task}
        setTask={setTask}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  );
}
