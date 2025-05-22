import { AlarmClockCheck, Pencil } from "lucide-react-native";
import * as React from "react";
import { View, Platform } from "react-native";
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
import { DatePicker } from "./DatePicker";

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
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    task.startDate ? new Date(task.startDate) : undefined
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    task.endDate ? new Date(task.endDate) : undefined
  );

  // Reset internal state when dialog opens or task changes
  React.useEffect(() => {
    if (showDialog) {
      setEditedTitle(task.title);
      setEditedCategory(task.category);
      setStartDate(task.startDate ? new Date(task.startDate) : undefined);
      setEndDate(task.endDate ? new Date(task.endDate) : undefined);
    }
  }, [task, showDialog]);

  const handleUpdateTitle = (title: string) => {
    setEditedTitle(title);
  };

  const handleUpdateCategory = (category: string) => {
    setEditedCategory(category);
  };

  const handleStartDateChange = (selectedDate?: Date) => {
    setStartDate(selectedDate);
    updateNotesWithDates(selectedDate, endDate);
  };

  const handleEndDateChange = (selectedDate?: Date) => {
    setEndDate(selectedDate);
    updateNotesWithDates(startDate, selectedDate);
  };

  const updateNotesWithDates = (start?: Date, end?: Date) => {
    let notes = editedCategory.split(' | ')[0]; // Get the original notes without dates
    if (notes.includes('From:') || notes.includes('To:')) {
      notes = ''; // Clear if it was just dates before
    }
    
    const dateInfo = [];
    if (start) {
      dateInfo.push(`From: ${formatDate(start)}`);
    }
    if (end) {
      dateInfo.push(`To: ${formatDate(end)}`);
    }
    
    const newNotes = [notes, ...dateInfo].filter(Boolean).join(' | ');
    setEditedCategory(newNotes);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select date";
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      const updatedTask = {
        ...task,
        title: editedTitle,
        category: editedCategory,
        startDate,
        endDate,
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
          <View className="bg-[#261B18] rounded-3xl flex flex-row justify-start items-center pl-4 py-2">
            <AlarmClockCheck stroke="white" />
            <Input
              className="rounded-3xl"
              value={editedTitle}
              placeholder="Task title"
              onChangeText={handleUpdateTitle}
            />
          </View>
          <View className="bg-[#261B18] rounded-3xl flex flex-row justify-start items-center pl-4 py-2">
            <Pencil stroke="white" />
            <Input
              className="rounded-3xl"
              value={editedCategory}
              placeholder="Notes"
              onChangeText={handleUpdateCategory}
            />
          </View>
          <View className="flex flex-row w-full justify-around">
            <DatePicker
              date={startDate}
              onChange={handleStartDateChange}
              label="Start Date"
            />
            <DatePicker
              date={endDate}
              onChange={handleEndDateChange}
              label="End Date"
            />
          </View>
        </View>

        <DialogFooter>
          <View className="flex flex-row justify-around w-full mt-2">
            {!isNewTask && (
              <Button variant="destructive" onPress={handleDelete} className="rounded-3xl w-48">
                <Text className="text-white">Delete</Text>
              </Button>
            )}
            <Button onPress={handleSave} className="bg-[#FF5833] rounded-3xl w-48">
              <Text>Save Task</Text>
            </Button>
          </View>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
