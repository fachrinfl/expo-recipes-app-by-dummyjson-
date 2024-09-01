import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  useCameraPermissions,
  PermissionStatus,
  CameraView,
} from "expo-camera";
import { useMutation } from "@tanstack/react-query";
import { fetchRecipeById } from "../services/api-services";
import Toast from "react-native-root-toast";
import colors from "../themes/colors";
import { useNavigation } from "@react-navigation/native";

const ScanRecipeScreen = () => {
  const navigation = useNavigation();  
  const [status, requestPermission] = useCameraPermissions();
  const { mutate, status: statusMutate } = useMutation({
    mutationKey: [fetchRecipeById],
    mutationFn: (id) => fetchRecipeById(id),
  });

  const isLoading = statusMutate === "pending";

  useEffect(() => {
    if (status !== PermissionStatus.GRANTED) {
      requestPermission();
    }
  }, [status]);

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <CameraView
          style={styles.screen}
          onBarcodeScanned={(value) =>
            mutate(value?.data, {
              onSuccess: (data) => {
                navigation.navigate("RecipeDetailScreen", { recipeId: data.id });
              },
              onError: () => {
                Toast.show("Data not found!", {
                  duration: Toast.durations.SHORT,
                });
              },
            })
          }
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
