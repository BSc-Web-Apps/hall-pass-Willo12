import React from "react";
import { View, Text, } from "react-native";
//import { Checkbox } from "~/components/ui/checkbox";

interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
}

export default function Task({ title, category, isChecked }: TaskProps) {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className="flex-1 flex flex-row gap-2 justify-center items-center">
      <View>
        <Text className="text-white">temp text</Text>
        {/* <Checkbox */}
        {/*   checked={checked} */}
        {/*   onCheckedChange={setChecked} */}
        {/* /> */}
      </View>
      <View className="">
        <Text className="text-white">{title}</Text>
        <Text className="text-white">{category}</Text>
      </View>
    </View>
  );
}
