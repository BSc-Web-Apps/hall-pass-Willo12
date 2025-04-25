import React from "react";
import { View, Text, } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";

interface Task {
  title: string;
  category: string;
  isChecked: boolean;
}
interface TaskProps {
  task: Task
}

export default function Task({ task }: TaskProps) {
  const [checked, setChecked] = React.useState(false);
  const [stateTask, setStateTask] = React.useState(task);
  const [isEditable, setIsEditable] = React.useState(false);
  const [initialTask, setInitialTask] = React.useState(task);

  const handleUpdateTask = (event: any) => {
    event.preventDefault();
    const updateTask = { ...stateTask }

    setIsEditable(!isEditable);
    setInitialTask(stateTask);
    setStateTask(updateTask);
  }

  const handleCancelChanges = (event: any) => {
    setIsEditable(!isEditable);
    setStateTask(initialTask);
  }

  const handleTitleChange = (value: any) => {
    const nextTask = { ...stateTask }
    nextTask.title = value;

    setStateTask(nextTask)
  }

  const handleCategoryChange = (value: any) => {
    const nextTask = { ...stateTask }
    nextTask.category = value;

    setStateTask(nextTask)
  }
  return (
    <>
      <View className="flex-1 flex flex-row gap-2 justify-center items-center">
        <View>
          <Checkbox
            checked={checked}
            onCheckedChange={setChecked}
          />
        </View>
        <View className={`${isEditable ? "flex" : "hidden"} flex-col gap-2 p-4 `}>
          <input
            type="text"
            value={stateTask.title}
            onChange={(event) => handleTitleChange(event.target.value)}
          />
          <input
            type="text"
            value={stateTask.category}
            onChange={(event) => handleCategoryChange(event.target.value)}
          />
        </View>

        <View className={`${isEditable ? "hidden" : "flex"} flex-col gap-2 p-4`}>
          <Text className="text-white">{stateTask.title}</Text>
          <Text className="text-white">{stateTask.category}</Text>
        </View>
        <button type="button" onClick={handleUpdateTask} className="mb-4 ml-4 px-4 py-1 rounded bg-gray-400 font-semibold text-gray-100 cursor-pointer hover:text-gray-300">{isEditable ? "Submit" : "Edit"}</button>
        <button type="button" onClick={handleCancelChanges} className={`${isEditable ? "flex" : "hidden"} mb-4 ml-4 px-4 py-1 rounded bg-gray-400 font-semibold text-gray-100 cursor-pointer hover:text-gray-300`}>Cancel</button>
      </View >
    </>
  );
}
