import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";
import analytics from "@react-native-firebase/analytics";


import colors from "./src/themes/colors";
import MainScreen from "./src/screens/MainScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({});

export default function App() {
  const [loaded, error] = useFonts({
    "Figtree-Bold": require("./assets/fonts/Figtree-Bold.ttf"),
    "Figtree-Medium": require("./assets/fonts/Figtree-Medium.ttf"),
    "Figtree-SemiBold": require("./assets/fonts/Figtree-SemiBold.ttf"),
  });

  useEffect(() => {
    sendAnalyticsEventAsync();
  }, []);

  async function sendAnalyticsEventAsync() {
    try {
      await analytics().logEvent("test_analytics_event", {
        additionalParam: "test",
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (!loaded || error) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RootSiblingParent>
          <NavigationContainer
            theme={{
              dark: false,
              colors,
            }}
          >
            <Stack.Navigator
              screenOptions={{
                headerTitleStyle: {
                  fontFamily: "Figtree-Bold",
                },
                headerShadowVisible: true,
              }}
            >
              <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="RecipeDetailScreen"
                component={RecipeDetailScreen}
                options={({ navigation }) => ({
                  headerTransparent: true,
                  headerTitle: "",
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <TouchableOpacity
                      style={styles.headerBtn}
                      activeOpacity={0.8}
                      onPress={() => navigation.goBack()}
                    >
                      <Ionicons
                        name="arrow-back"
                        size={20}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  ),
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </RootSiblingParent>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  headerBtn: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.border,
    borderWidth: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
