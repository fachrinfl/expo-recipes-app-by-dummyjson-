import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  useCameraPermissions,
  PermissionStatus,
  CameraView,
} from "expo-camera";
import Toast from "react-native-root-toast";
import colors from "../themes/colors";
import { useNavigation } from "@react-navigation/native";
import dataRecipes from "../constants/data.json";

const ScanRecipeScreen = () => {
  const navigation = useNavigation();  
  const [isLoading, setIsLoading] = useState(false);
  const [status, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (status !== PermissionStatus.GRANTED) {
      requestPermission();
    }
  }, [status]);

  const searchRecipe = (value) => {
    console.log(value?.data)
    setIsLoading(true);
    const findRecipe = dataRecipes.recipes.find((recipe) => Number(recipe.id) === Number(value?.data));
    if (findRecipe) {
      navigation.navigate("RecipeDetailScreen", { recipeId: findRecipe.id });
    } else {
      Toast.show("Data not found!", {
        duration: Toast.durations.SHORT,
      });
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <CameraView
          style={styles.screen}
          onBarcodeScanned={(value) => searchRecipe(value)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ScanRecipeScreen;
