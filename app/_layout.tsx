import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PortalHost } from "@rn-primitives/portal";
import * as React from "react";
import { Platform } from "react-native";
import AddTask from "~/components/ui/AddTask";
import "~/global.css";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { Home as HomeIcon } from "~/lib/icons/Home";
import { Info } from "~/lib/icons/Info";
import { TaskProvider } from "~/lib/TaskContext";
import { useColorScheme } from "~/lib/useColorScheme";
import HomeScreen from "./index";
import SettingsScreen from "./settings";
import { ListTodo } from "lucide-react-native";

const Tab = createBottomTabNavigator();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <TaskProvider>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "hsl(11, 72%, 3%)",
              borderTopColor: "transparent",
            },
            tabBarActiveTintColor: "hsl(11, 100%, 60%)",
            tabBarInactiveTintColor: "hsla(11, 20%, 64%, 0.5)",
          }}
        >
          <Tab.Screen
            name="Todo"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <ListTodo size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color, size }) => <Info size={size} color={color} />,
            }}
          />
        </Tab.Navigator>
        <AddTask />
        <PortalHost />
      </TaskProvider>
    </>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
