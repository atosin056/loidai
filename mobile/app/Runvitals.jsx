import { useEffect } from "react";
import { Text, View } from "react-native";
import { Vitals } from "./Vitals"; // your function

export default function Runvitals() {
  useEffect(() => {
    // run the async function safely
    async function RunVitals() {
      const result = await Vitals();
      console.log("Vitals function finished:", result);
    }

    RunVitals();
  }, []); // run once on mount

  return (
    <View>
      <Text>Check console for Vitals demo output!</Text>
    </View>
  );
}
