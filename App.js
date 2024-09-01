import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { ActivityIndicator, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "./src/themes/colors";
import MainScreen from "./src/screens/MainScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({});

export default function App() {
  const [loaded, error] = useFonts({
    "Figtree-Black": require("./assets/fonts/Figtree-Black.ttf"),
    "Figtree-BlackItalic": require("./assets/fonts/Figtree-BlackItalic.ttf"),
    "Figtree-Bold": require("./assets/fonts/Figtree-Bold.ttf"),
    "Figtree-BoldItalic": require("./assets/fonts/Figtree-BoldItalic.ttf"),
    "Figtree-ExtraBold": require("./assets/fonts/Figtree-ExtraBold.ttf"),
    "Figtree-ExtraBoldItalic": require("./assets/fonts/Figtree-ExtraBoldItalic.ttf"),
    "Figtree-Italic": require("./assets/fonts/Figtree-Italic.ttf"),
    "Figtree-Light": require("./assets/fonts/Figtree-Light.ttf"),
    "Figtree-LightItalic": require("./assets/fonts/Figtree-LightItalic.ttf"),
    "Figtree-Medium": require("./assets/fonts/Figtree-Medium.ttf"),
    "Figtree-MediumItalic": require("./assets/fonts/Figtree-MediumItalic.ttf"),
    "Figtree-Regular": require("./assets/fonts/Figtree-Regular.ttf"),
    "Figtree-SemiBold": require("./assets/fonts/Figtree-SemiBold.ttf"),
    "Figtree-SemiBoldItalic": require("./assets/fonts/Figtree-SemiBoldItalic.ttf"),
  });

  if (!loaded || error) {
    return (
      <View
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
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
              headerTitle: '',
              headerShadowVisible: false,
              headerLeft: () => (
                <TouchableOpacity
                  style={styles.headerBtn}
                  activeOpacity={0.8}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={20} color={colors.text} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  style={styles.headerBtn}
                  activeOpacity={0.8}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="bookmark-outline" size={20} color={colors.text} />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
