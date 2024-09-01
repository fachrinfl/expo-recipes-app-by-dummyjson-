import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "../themes/colors";

import RecipeListScreen from "./RecipeListScreen";
import ScanRecipeScreen from "./ScanRecipeScreen";
import SavedRecipesScreen from "./SavedRecipesScreen";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Figtree-Bold",
        },
        headerShadowVisible: true,
        headerStyle: styles.header,
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "Figtree-SemiBold",
        },
      }}
    >
      <Tab.Screen
        name="RecipeListScreen"
        component={RecipeListScreen}
        options={{
          title: "Recipes",
          tabBarLabel: "Recipes",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.searchBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("SearchRecipeScreen")}
            >
              <Ionicons name="search-sharp" size={20} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="ScanRecipeScreen"
        component={ScanRecipeScreen}
        options={{
          title: "Scan",
          tabBarLabel: "",
          tabBarIcon: ({ size }) => (
            <View style={styles.scanBtn}>
              <Ionicons
                name="scan-sharp"
                size={size}
                color={colors.background}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SavedRecipesScreen"
        component={SavedRecipesScreen}
        options={{
          title: "Saved",
          tabBarLabel: "Saved",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scanBtn: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -25,
  },
  searchBtn: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.border,
    borderWidth: 1,
    marginRight: 16,
  },
});

export default MainScreen;
