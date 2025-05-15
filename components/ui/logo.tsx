import { CircleCheck, Icon } from "lucide-react-native";
import { View, Text } from "react-native";



export default function Logo() {
  return (
    <View className="flex-1 justify-center items-center flex-row gap-5">
      <Text className="text-5xl text-white font-bold">HallPass</Text>
      <CircleCheck size={80} color="#614E49" />
    </View>
  );
}
