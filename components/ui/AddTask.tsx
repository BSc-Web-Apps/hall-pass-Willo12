import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Plus } from "~/lib/icons/Plus";
import TaskDialog from "./TaskDialogue";

interface AddTaskProps {
  onAdd: (title: string, category: string) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");

  const handleSave = () => {
    if (title.trim()) {
      onAdd(title, category);
      setTitle("");
      setCategory("");
      setShowDialog(false);
    }
  };

  return (
    <View className="absolute -bottom-0 z-10 ">
      <View className="w-24 h-24 p-1 bg-brand-primary rounded-full flex items-center justify-center">
        <TouchableOpacity onPress={() => setShowDialog(true)}>
          <View className="w-full h-auto p-3 bg-brand-primary rounded-full flex items-center justify-center border-4 border-background">
            <Plus size={48} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <TaskDialog
        task={{ id: 0, title, category, isChecked: false }}
        setTask={(newTask) => {
          setTitle(newTask.title);
          setCategory(newTask.category);
        }}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onSave={handleSave}
      />
    </View>
  );
}
