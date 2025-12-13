import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Animated values for each input
  const emailAnim = useRef(new Animated.Value(email ? 1 : 0)).current;
  const passwordAnim = useRef(new Animated.Value(password ? 1 : 0)).current;

  // Track which input is focused
  const [focusedInput, setFocusedInput] = useState(null);

  // Helper to animate label
  const animateLabel = (anim, isActive) => {
    Animated.timing(anim, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animateLabel(emailAnim, focusedInput === "email" || email);
  }, [focusedInput, email]);

  useEffect(() => {
    animateLabel(passwordAnim, focusedInput === "password" || password);
  }, [focusedInput, password]);

  const getLabelStyle = (anim) => ({
    position: "absolute",
    left: 16,
    top: anim.interpolate({ inputRange: [0, 1], outputRange: [18, -10] }),
    fontSize: anim.interpolate({ inputRange: [0, 1], outputRange: [14, 12] }),
    color: anim.interpolate({
      inputRange: [0, 1],
      outputRange: ["#555555", "#000000"],
    }),
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 4,
    zIndex: 1,
  });

  const inputStyle = {
    borderWidth: 1,
    borderColor: "#BBBBBB",
    borderRadius: 12,
    height: 57,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    paddingLeft: 16,
    color: "#555",
    justifyContent: "center",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F9F9", padding: 24 }}>
      <View>
        <Image
          source={require("../assets/images/logo-size1.png")}
          style={{ width: 33, height: 33, marginBottom: 16 }}
        />
      </View>
      <View style={{ gap: 10 }}>
        <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 30 }}>
          Sign In
        </Text>
        <View style={{ gap: 20 }}>
          {/* Email */}
          <View>
            <Animated.Text style={getLabelStyle(emailAnim)}>
              Email
            </Animated.Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
              style={inputStyle}
            />
          </View>

          {/* Password */}
          <View>
            <Animated.Text style={getLabelStyle(passwordAnim)}>
              Password
            </Animated.Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
              secureTextEntry
              style={inputStyle}
            />
          </View>
          {/* Or Section */}
          <View>
            <Image
              source={require("../assets/images/or.png")}
              style={{ height: 18, width: "100%" }}
            ></Image>
          </View>
          <View style={{ gap: 16 }}>
            {/* {Facebook} */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 12,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                height: 64,
                backgroundColor: "#485A96",
              }}
            >
              <View>
                <Image
                  source={require("../assets/images/facebook.png")}
                  style={{ width: 25, height: 25 }}
                ></Image>
              </View>
              <View>
                <Text
                  style={{ color: "white", fontFamily: "Poppins_400Regular" }}
                >
                  Sign in with Facebook
                </Text>
              </View>
            </TouchableOpacity>
            {/* {Google} */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 12,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                height: 64,
                backgroundColor: "#000",
              }}
            >
              <View>
                <Image
                  source={require("../assets/images/google.png")}
                  style={{ width: 25, height: 25 }}
                ></Image>
              </View>
              <View>
                <Text
                  style={{ color: "white", fontFamily: "Poppins_400Regular" }}
                >
                  Sign in with Google
                </Text>
              </View>
            </TouchableOpacity>
            {/* {Apple} */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 12,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                height: 64,
                backgroundColor: "#fff",
                borderColor: "#555",
                borderWidth: 1,
              }}
            >
              <View>
                <Image
                  source={require("../assets/images/apple.png")}
                  style={{ width: 25, height: 25 }}
                ></Image>
              </View>
              <View>
                <Text
                  style={{ color: "black", fontFamily: "Poppins_400Regular" }}
                >
                  Sign in with Apple
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Dashboard")}
          style={{
            backgroundColor: "#007BFF",
            borderRadius: 100,
            height: 57,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontFamily: "Poppins_400Regular" }}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
