import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import Chat from "./Chat";
import Dashboard from "./Dashboard";
import Notifications from "./Notifications";
import Pulserate from "./Pulserate";
import Pushmanager from "./Pushmanager";
import ReadVitals from "./ReadVitals";
import Runvitals from "./Runvitals";
import Settings from "./Settings";
import Signin from "./Signin";
import { Vitals } from "./Vitals";
import Walkthrough from "./Walkthrough"; // adjust path if needed
const Stack = createNativeStackNavigator();

function Splash({ navigation }) {
  useEffect(() => {
    // Redirect to Walkthrough
    navigation.replace("Walkthrough");
  }, []);

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <ActivityIndicator size="large" color="#000" />
    // </View>
    null
  );
}

export default function Index() {
  useEffect(() => {
    const hideBars = async () => {
      try {
        // hide top status bar
        StatusBar.setHidden(true, "fade");

        // hide bottom system nav bar
        await NavigationBar.setVisibilityAsync("hidden");

        // make it stay hidden even when user swipes
        await NavigationBar.setBehaviorAsync("overlay-swipe");
      } catch (e) {
        console.log("Error hiding bars:", e);
      }
    };

    hideBars();
  }, []);

  useEffect(() => {
    Vitals();
    // Then run every 5 minutes
    const interval = setInterval(Vitals, 5 * 60 * 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName="Runvitals"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Walkthrough" component={Walkthrough} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Pulserate" component={Pulserate} />
      <Stack.Screen name="ReadVitals" component={ReadVitals} />
      <Stack.Screen name="Pushmanager" component={Pushmanager} />
      <Stack.Screen name="Runvitals" component={Runvitals} />
      <Stack.Screen name="Vitals" component={Vitals} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
}
