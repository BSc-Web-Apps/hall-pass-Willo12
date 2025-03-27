import { CircleCheck, Icon } from "lucide-react-native";
import { View, Text } from "react-native";



export default function Logo() {
  return (
    <View className="flex-1 flex-row gap-5 mt-32">
      <Text className="text-7xl text-white font-bold">HallPass</Text>
      <CircleCheck size={80} color="#614E49" />
    </View>
  );
}
