import * as React from "react";
import { View } from "react-native";
import { Task } from "~/components/ui/task";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useTasks } from "~/lib/TaskContext";

interface TaskDialogProps {
  task: Task;
  setTask: (task: Task) => void;
  setShowDialog: (showDialog: boolean) => void;
  showDialog: boolean;
  onSave?: (updatedTask: Task) => void;
}

export default function TaskDialog({
  task,
  setTask,
  setShowDialog,
  showDialog,
  onSave,
}: TaskDialogProps) {
  const { deleteTask } = useTasks();
  const isNewTask = task.id === 0;

  const [editedTitle, setEditedTitle] = React.useState(task.title);
  const [editedCategory, setEditedCategory] = React.useState(task.category);

  // Reset internal state when dialog opens or task changes
  React.useEffect(() => {
    if (showDialog) {
      setEditedTitle(task.title);
      setEditedCategory(task.category);
    }
  }, [task, showDialog]);

  const handleUpdateTitle = (title: string) => {
    setEditedTitle(title);
  };

  const handleUpdateCategory = (category: string) => {
    setEditedCategory(category);
  };

  const handleSave = () => {
    // Only proceed if title is not empty
    if (editedTitle.trim()) {
      // Create the updated task
      const updatedTask = {
        ...task,
        title: editedTitle,
        category: editedCategory,
      };

      // First close the dialog
      setShowDialog(false);

      // Then update the task and call onSave
      // This ensures the dialog is closed before any state updates
      setTimeout(() => {
        setTask(updatedTask);
        if (onSave) {
          onSave(updatedTask);
        }
      }, 0);
    } else {
      // Just close the dialog if title is empty
      setShowDialog(false);
    }
  };

  const handleDelete = () => {
    setShowDialog(false);
    // Use setTimeout to ensure dialog is closed before deletion
    setTimeout(() => {
      deleteTask(task.id);
    }, 0);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isNewTask ? "Add" : "Edit"} Task</DialogTitle>
          <DialogDescription className="w-80">
            {isNewTask
              ? "Add a new task here."
              : "Make changes to your task details here."}
          </DialogDescription>
        </DialogHeader>

        <View className="gap-4">
          <Input
            value={editedTitle}
            placeholder="Task title"
            onChangeText={handleUpdateTitle}
          />
          <Input
            value={editedCategory}
            placeholder="Category"
            onChangeText={handleUpdateCategory}
          />
        </View>

        <DialogFooter>
          <View className="flex flex-row justify-between w-full">
            {!isNewTask && (
              <Button variant="destructive" onPress={handleDelete}>
                <Text className="text-white">Delete</Text>
              </Button>
            )}
            <View className="flex flex-row gap-2">
              <Button variant="outline" onPress={() => setShowDialog(false)}>
                <Text>Cancel</Text>
              </Button>
              <Button onPress={handleSave}>
                <Text>Save changes</Text>
              </Button>
            </View>
          </View>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
