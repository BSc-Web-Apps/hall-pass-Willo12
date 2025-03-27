import * as React from "react";
import { View } from "react-native";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Logo from "~/components/ui/logo";
import { Text } from "~/components/ui/text";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-background">
      <Logo />
    </View>
  );
}
