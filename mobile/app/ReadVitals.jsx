import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ReadVitals() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 50,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 30,
      }}
    >
      <View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={require("../assets/images/left.png")}
            style={{ width: 28, height: 28 }}
          ></Image>

          <View>
            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 24 }}>
              Read Vitals
            </Text>
          </View>
        </Pressable>
        <View style={{ marginTop: 20 }}>
          <View style={{ gap: 10 }}>
            <Pressable>
              <View
                style={{
                  backgroundColor: "#EAFAEE",
                  height: 96,
                  borderRadius: 20,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: "#F2F9FF",
                    width: 64,
                    height: 64,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/images/sleep.png")}
                    style={{ width: 32, height: 32 }}
                  ></Image>
                </View>
                <View>
                  <View>
                    <Text
                      style={{ fontFamily: "Poppins_400Regular", fontSize: 11 }}
                    >
                      Sleep
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 24, fontFamily: "Poppins_500Medium" }}
                    >
                      6.5
                    </Text>
                    <Text
                      style={{
                        color: "#999",
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      Hrs
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
            {/* End */}
            <Pressable>
              <View
                style={{
                  backgroundColor: "#F3EAFA",
                  height: 96,
                  borderRadius: 20,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: "#FFF8E5",
                    width: 64,
                    height: 64,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/images/temperature.png")}
                    style={{ width: 32, height: 32 }}
                  ></Image>
                </View>
                <View>
                  <View>
                    <Text
                      style={{ fontFamily: "Poppins_400Regular", fontSize: 11 }}
                    >
                      Temperature
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 24, fontFamily: "Poppins_500Medium" }}
                    >
                      36.6
                    </Text>
                    <Text
                      style={{
                        color: "#999",
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      °C
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
            {/* End */}
            <Pressable>
              <View
                style={{
                  backgroundColor: "#EAFAEE",
                  height: 96,
                  borderRadius: 20,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: "#F2F9FF",
                    width: 64,
                    height: 64,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/images/bloodpressure.png")}
                    style={{ width: 32, height: 32 }}
                  ></Image>
                </View>
                <View>
                  <View>
                    <Text
                      style={{ fontFamily: "Poppins_400Regular", fontSize: 11 }}
                    >
                      Blood Pressure
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 24, fontFamily: "Poppins_500Medium" }}
                    >
                      120/80
                    </Text>
                    <Text
                      style={{
                        color: "#999",
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      mmHg
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
            {/* End */}
            <Pressable>
              <View
                style={{
                  backgroundColor: "#E5F2FF",
                  height: 96,
                  borderRadius: 20,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: "#F2F9FF",
                    width: 64,
                    height: 64,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/images/heartbeat.png")}
                    style={{ width: 32, height: 32 }}
                  ></Image>
                </View>
                <View>
                  <View>
                    <Text
                      style={{ fontFamily: "Poppins_400Regular", fontSize: 11 }}
                    >
                      Pulse Rate
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 24, fontFamily: "Poppins_500Medium" }}
                    >
                      72
                    </Text>
                    <Text
                      style={{
                        color: "#999",
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      BPM
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
            {/* End */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
