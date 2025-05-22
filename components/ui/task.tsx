import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";
import { Text } from "~/components/ui/text";
import { useTasks } from "~/lib/TaskContext";
import TaskDialog from "./TaskDialogue";

export interface Task {
  id: number;
  title: string;
  category: string;
  isChecked: boolean;
}

export interface TaskProps {
  task: Task;
  onUpdate?: (task: Task) => void;
}

export default function Task({ task: propTask, onUpdate }: TaskProps) {
  const { updateTask } = useTasks();
  const [task, setTask] = React.useState(propTask);
  const [showDialog, setShowDialog] = React.useState(false);
  const { title, category, isChecked } = task;

  const handleSetChecked = () => {
    const updatedTask = { ...task, isChecked: !task.isChecked };
    setTask(updatedTask);

    // Use the provided onUpdate or fall back to context
    if (onUpdate) {
      onUpdate(updatedTask);
    } else {
      updateTask(updatedTask);
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTask(updatedTask);

    // Use the provided onUpdate or fall back to context
    if (onUpdate) {
      onUpdate(updatedTask);
    } else {
      updateTask(updatedTask);
    }
  };

  return (
    <>
      <TouchableOpacity
        className="flex flex-row w-full"
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
          <Text
            className={`${isChecked ? "line-through text-stone-200/50" : "text-foreground"
              } text-xl`}
          >
            {title}
          </Text>
          <Text className={`text-foreground-transparent text-xl ${isChecked ? "opacity-50" : "opacity-100"}`}>
            {category}
          </Text>
        </View>
      </TouchableOpacity>

      <TaskDialog
        task={task}
        setTask={handleTaskUpdate}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  );
}
