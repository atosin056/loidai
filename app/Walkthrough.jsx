import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Walkthrough() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/images/walkbg.png")}
        style={{ flex: 1 }}
        resizeMode="contain"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            padding: 20,
            paddingTop: 70,
            paddingBottom: 50,
          }}
        >
          <View style={{ lineHeight: 26, gap: 30 }}>
            <View>
              <Image source={require("../assets/images/logo-text.png")}></Image>
            </View>
            <View style={{ width: "63%" }}>
              <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 26 }}>
                Your Digital First Aid Assistant
              </Text>
              <Text
                style={{
                  color: "#434141",
                  fontFamily: "Poppins_400Regular",
                  lineHeight: 27,
                }}
              >
                Welcome to your personal health assistant.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#007BFF",
              width: 162,
              height: 60,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
