import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Plus } from "~/lib/icons/Plus";
import { useTasks } from "~/lib/TaskContext";
import { Task } from "~/components/ui/task";
import TaskDialog from "./TaskDialogue";

interface AddTaskButtonProps {
  handleShowDialogue: () => void;
}
function AddTaskButton({ handleShowDialogue }: AddTaskButtonProps) {
  return (
    <TouchableOpacity onPress={handleShowDialogue}>
      <View className="w-full h-auto p-3 bg-brand-primary rounded-full flex items-center justify-center border-4 border-background">
        <Plus size={48} className="text-background" />
      </View>
    </TouchableOpacity>
  );
}

export default function AddTask() {
  const blankTask: Task = { id: 0, title: "", category: "", isChecked: false };
  const { addTask } = useTasks();

  const [showDialog, setShowDialog] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [task, setTask] = React.useState(blankTask);

  // Get screen width for centering
  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = 40 * 2; // Based on your w-24 class (24 units × 2 sides)
  const leftPosition = (screenWidth - buttonWidth) / 2;

  const handleSave = async (updatedTask: Task) => {
    if (!updatedTask.title.trim()) {
      setShowDialog(false);
      return;
    }

    setIsSaving(true);
    try {
      // Use the context's addTask function
      await addTask(updatedTask.title, updatedTask.category || "");
      setTask(blankTask); // Reset the task
      setShowDialog(false); // Close the dialog after saving
    } catch (error) {
      console.error("Failed to add task:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  return (
    <View
      className="absolute bottom-6"
      style={{
        left: leftPosition,
        zIndex: 50,
      }}
    >
      <View className="w-24 h-24 p-1 bg-brand-primary rounded-full flex items-center justify-center">
        <AddTaskButton handleShowDialogue={handleShowDialog} />
      </View>

      <TaskDialog
        task={blankTask}
        setTask={setTask}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onSave={handleSave}
      />
    </View>
  );
}
