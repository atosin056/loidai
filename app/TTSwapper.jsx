import * as Speech from "expo-speech";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

export default function TTSwapper({ text = "", imgOff, imgOn, size = 40 }) {
  const [active, setActive] = useState(false);

  const toggle = () => {
    if (!text || text.trim() === "") return; // prevent speaking blank

    const newState = !active;
    setActive(newState);

    if (newState) {
      Speech.speak(text);
    } else {
      Speech.stop();
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={toggle}>
        <Image
          source={active ? imgOn : imgOff}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
