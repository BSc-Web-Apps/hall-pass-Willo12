import * as React from "react";
import { Button, TouchableOpacity, View } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";
import { Text } from "~/components/ui/text";
import TaskDialog from "./TaskDialogue";
import { CrossIcon, XCircleIcon, XIcon } from "lucide-react-native";

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
  onUpdate?: (task: Task) => void;
}

export default function Task({ task: propTask, onDelete, onUpdate }: TaskProps) {
  const [task, setTask] = React.useState(propTask);
  const [showDialog, setShowDialog] = React.useState(false);

  // Update local state when prop changes
  React.useEffect(() => {
    setTask(propTask);
  }, [propTask]);

  const handleSetChecked = () => {
    const updatedTask = { ...task, isChecked: !task.isChecked };
    setTask(updatedTask);
    if (onUpdate) {
      onUpdate(updatedTask);
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTask(updatedTask);
    if (onUpdate) {
      onUpdate(updatedTask);
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <>
      <TouchableOpacity
        className="flex flex-row w-screen px-20"
        delayLongPress={500}
        onLongPress={() => setShowDialog(true)}
      >
        <View className="px-8 pt-8 w-24 h-full">
          <Checkbox
            className="border-foreground checked:bg-foreground"
            checked={task.isChecked}
            onCheckedChange={handleSetChecked}
          />
        </View>
        <View className="py-4 flex gap-1 flex-1 h-full border-b border-foreground-transparent">
          <Text className="text-foreground text-xl">{task.title}</Text>
          <Text className="text-foreground-transparent text-xl">
            {task.category}
          </Text>
        </View>
        <View className="flex justify-center items-center">
          <TouchableOpacity onPress={handleDelete}>
            <XCircleIcon size={36} fill="#FF757F" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <TaskDialog
        dialogTitle="Edit Task"
        task={task}
        setTask={handleTaskUpdate}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  );
}
