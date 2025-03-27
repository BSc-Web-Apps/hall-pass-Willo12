import { CircleCheck, Icon } from "lucide-react-native";
import { View, Text } from "react-native";



export default function Logo() {
  return (
    <View className="flex-1 flex-row items-center gap-5 p-6">
      <Text className="text-7xl text-white font-bold">HallPass</Text>
      <CircleCheck size={80} color="#614E49" />
    </View>
  );
}
