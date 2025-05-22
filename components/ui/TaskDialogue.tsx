import React from "react";
import { View } from "react-native";
import { Task } from "./task";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Input } from "./input";
import { Text } from "./text";

interface TaskDialogProps {
  task: Task;
  setTask: (task: Task) => void;
  setShowDialog: (showDialog: boolean) => void;
  showDialog: boolean;
  onSave?: (title: string, category: string) => void;
  dialogTitle: string;
}

export default function TaskDialog({
  task,
  setTask,
  setShowDialog,
  showDialog,
  onSave,
  dialogTitle,
}: TaskDialogProps) {
  const isNewTask = task.title === "" && task.category === "";

  const [editedTitle, setEditedTitle] = React.useState(task.title);
  const [editedCategory, setEditedCategory] = React.useState(task.category);

  // Reset edited values when dialog opens with a new task
  React.useEffect(() => {
    if (showDialog) {
      setEditedTitle(task.title);
      setEditedCategory(task.category);
    }
  }, [showDialog, task.title, task.category]);

  const handleUpdateTitle = (title: string) => {
    setEditedTitle(title);
  };

  const handleUpdateCategory = (category: string) => {
    setEditedCategory(category);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      const nextTask = {
        ...task,
        title: editedTitle,
        category: editedCategory,
      };

      setTask(nextTask);
      if (onSave) {
        onSave(editedTitle, editedCategory);
      } else {
        setShowDialog(false);
      }
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            Make changes to your task details here.
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
          <Button variant="outline" onPress={() => setShowDialog(false)}>
            <Text>Cancel</Text>
          </Button>
          <Button onPress={handleSave}>
            <Text>Save changes</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

