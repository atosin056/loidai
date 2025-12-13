import { useNavigation } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNav from "./BottomNav";
export default function Dashboard() {
  const navigation = useNavigation();
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
  function PulseRate() {
    navigation.navigate("Pulserate");
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 70,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 30,
      }}
    >
      <View
        style={{
          width: "100%",

          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            source={require("../assets/images/logo-size1.png")}
            style={{ width: 50, height: 50 }}
          ></Image>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              backgroundColor: "#FAFAFA",
              borderWidth: 1,
              borderColor: "#d9d9d9",
              borderRadius: 100,
              padding: 5,
              paddingRight: 15,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 0.7,
                borderColor: "#d9d9d9",
              }}
            >
              <Image source={require("../assets/images/callicon.png")}></Image>
            </View>
            <View>
              <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}>
                Emergency
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#d9d9d9",
                borderRadius: 20,
                width: 56,
                height: 56,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={require("../assets/images/bell.png")}></Image>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{ gap: 30 }}>
          <View style={{ width: "100%" }}>
            <View>
              <View>
                <Text
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 30 }}
                >
                  Your vitals are looking great John!
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", gap: 10 }}>
            <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
              <Pressable
                onPress={PulseRate}
                style={{
                  backgroundColor: "#E5F2FF",
                  flex: 7,
                  height: 187,
                  borderRadius: 20,
                  padding: 15,
                  paddingBottom: 20,
                  justifyContent: "space-between",
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
                  <View style={{ gap: 5 }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Pulse Rate
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        gap: 2,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins_500Medium",
                          fontSize: 32,
                        }}
                      >
                        72
                      </Text>
                      <Text
                        style={{ lineHeight: 35, color: "grey", fontSize: 12 }}
                      >
                        BPM
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#EAFAEE",
                  flex: 4,
                  height: 187,
                  borderRadius: 20,
                  padding: 15,
                  paddingBottom: 20,
                  justifyContent: "space-between",
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
                  <Image source={require("../assets/images/sleep.png")}></Image>
                </View>
                <View>
                  <View style={{ gap: 1 }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Sleep Rate
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        gap: 2,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins_500Medium",
                          fontSize: 32,
                        }}
                      >
                        6.5
                      </Text>
                      <Text
                        style={{ lineHeight: 35, color: "grey", fontSize: 12 }}
                      >
                        Hrs
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
              <Pressable
                style={{
                  backgroundColor: "#EAFAEE",
                  flex: 4,
                  height: 187,
                  borderRadius: 20,
                  padding: 15,
                  paddingBottom: 20,
                  justifyContent: "space-between",
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
                    source={require("../assets/images/temperature.png")}
                  ></Image>
                </View>
                <View>
                  <View style={{ gap: 5 }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Temperature
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-start", // this helps align the top parts better
                        gap: 2,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins_500Medium",
                          fontSize: 32,
                        }}
                      >
                        36.6
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "grey",
                          fontFamily: "Poppins_400Regular",
                          lineHeight: 28,
                        }}
                      >
                        °C
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#E5F2FF",
                  flex: 7,
                  height: 187,
                  borderRadius: 20,
                  padding: 15,
                  paddingBottom: 20,
                  justifyContent: "space-between",
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
                  ></Image>
                </View>
                <View>
                  <View style={{ gap: 5 }}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Blood Pressure
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        gap: 2,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins_500Medium",
                          fontSize: 32,
                        }}
                      >
                        120/80
                      </Text>
                      <Text
                        style={{ lineHeight: 35, color: "grey", fontSize: 12 }}
                      >
                        mmHg
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
          <View>
            <View>
              <View>
                <View
                  style={{
                    backgroundColor: "#F2F2F7",
                    height: 310,
                    borderRadius: 20,
                    padding: 20,
                    gap: 20,
                  }}
                >
                  <View>
                    <View>
                      <Text
                        style={{
                          fontFamily: "Poppins_600SemiBold",
                          fontSize: 18,
                        }}
                      >
                        Recent Activity
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Poppins_500Medium",
                          fontSize: 12,
                          color: "#6e6e73",
                        }}
                      >
                        Quick navigations
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={{ gap: 10 }}>
                      <View
                        style={{
                          backgroundColor: "white",
                          borderRadius: 15,
                          alignItems: "center",
                          paddingHorizontal: 10,
                          gap: 15,
                          flexDirection: "row",
                          height: 80,
                        }}
                      >
                        <View>
                          <Image
                            source={require("../assets/images/temperaturereading.png")}
                          ></Image>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "Poppins_600SemiBold",
                            }}
                          >
                            Temperature reading
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontFamily: "Poppins_400Regular",
                              color: "#6e6e73",
                            }}
                          >
                            The surface temperature is 36.6°C
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: "white",
                          borderRadius: 15,
                          alignItems: "center",
                          paddingHorizontal: 10,
                          gap: 15,
                          flexDirection: "row",
                          height: 80,
                        }}
                      >
                        <View>
                          <Image
                            source={require("../assets/images/bodymass.png")}
                          ></Image>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "Poppins_600SemiBold",
                            }}
                          >
                            Body Mass Index
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontFamily: "Poppins_400Regular",
                              color: "#6e6e73",
                            }}
                          >
                            The surface temperature is 36.6°C
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: 382,
                  height: 208,
                  borderRadius: 44,
                  marginTop: 20,
                }}
              >
                <ImageBackground
                  source={require("../assets/images/healthtip.png")}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 20,
                      }}
                    >
                      <View style={{ flex: 5, gap: 8 }}>
                        <View>
                          <Text
                            style={{
                              fontFamily: "Poppins_600SemiBold",
                              fontSize: 18,
                            }}
                          >
                            Health tips
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Poppins_400Regular",
                              fontSize: 12,
                              color: "grey",
                            }}
                          >
                            Did you know?
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: 14,
                            color: "#777",
                            width: "80%",
                          }}
                        >
                          Washing your hands frequently reduces the risk of
                          infections.
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Image
                          source={require("../assets/images/bacteria.png")}
                          style={{ width: 120, height: 160, borderRadius: 24 }}
                        ></Image>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}
