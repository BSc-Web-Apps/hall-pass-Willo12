import { AlarmClockCheck, Pencil } from "lucide-react-native";
import * as React from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Task } from "~/components/ui/task";
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
    if (editedTitle.trim()) {
      const updatedTask = {
        ...task,
        title: editedTitle,
        category: editedCategory,
      };

      setShowDialog(false);

      setTimeout(() => {
        setTask(updatedTask);
        if (onSave) {
          onSave(updatedTask);
        }
      }, 0);
    } else {
      setShowDialog(false);
    }
  };

  const handleDelete = () => {
    setShowDialog(false);
    setTimeout(() => {
      deleteTask(task.id);
    }, 0);
  };

  return (

    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="w-screen">

        <View className="gap-4">
          <View className="bg-[#261B18] rounded-3xl flex flex-row justify-start items-center pl-4"
          >
            <AlarmClockCheck stroke="white" />
            <Input
              className="rounded-3xl "
              value={editedTitle}
              placeholder="Task title"
              onChangeText={handleUpdateTitle}
            />
          </View>
          <View className="bg-[#261B18] rounded-3xl flex flex-row justify-start items-center pl-4"
          >
            <Pencil stroke="white" />
            <Input
              className=" rounded-3xl"
              value={editedCategory}
              placeholder="Notes"
              onChangeText={handleUpdateCategory}
            />

          </View>
        </View>

        <DialogFooter>
          <View className="flex flex-row justify-evenly w-full mt-2">
            {!isNewTask && (
              <Button variant="destructive" onPress={handleDelete} className="rounded-3xl w-24">
                <Text className="text-white">Delete</Text>
              </Button>
            )}
            <Button onPress={handleSave} className="bg-[#FF5833] rounded-3xl w-48">
              <Text>Save Task</Text>
            </Button>
          </View>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}
