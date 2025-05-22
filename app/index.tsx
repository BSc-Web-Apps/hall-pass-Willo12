import { CircleCheck } from "lucide-react-native";
import * as React from "react";
import { ScrollView, View } from "react-native";
import Task from "~/components/ui/task";
import { Text } from "~/components/ui/text";
import { useTasks } from "~/lib/TaskContext";

export default function HomeScreen() {
  const { tasks, isLoading, updateTask } = useTasks();

  return (
    <View className="flex-1 flex justify-between bg-background">
      <View className="flex flex-row justify-center items-center pt-20 pb-8 gap-4">
        <Text className="text-foreground font-bold text-6xl">
          HallPass
        </Text>
        <CircleCheck className="" size={60} stroke={"#614E49"} strokeWidth={-2} />
      </View>
      <ScrollView className="px-6 h-20 mb-40">
        {isLoading ? (
          <Text className="text-center text-foreground text-lg">
            Loading tasks...
          </Text>
        ) : tasks.length === 0 ? (
          <Text className="text-center text-foreground text-lg">
            Please add your first task...
          </Text>
        ) : (
          <>

            <Text className="text-lg font-bold">
              Today's Tasks
            </Text>

            {tasks.map((task) => (
              <Task key={task.id} task={task} onUpdate={updateTask} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
