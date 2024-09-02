import React, {useEffect, useState} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../themes/colors";
import { Ionicons } from "@expo/vector-icons";
import {useDispatch} from 'react-redux';
import {addSaved, fetchSavedById, deleteSaved} from '../redux/savedSlice';
import dataRecipes from "../constants/data.json";

const RecipeDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isSaved, setIsSaved] = useState(false);
  const { recipeId } = route.params;
  const data = dataRecipes.recipes.find((recipe) => recipe.id === recipeId);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => data ?( 
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.8}
          onPress={() => isSaved ? removeRecipe() : saveRecipe()}
        >
          <Ionicons
            name={isSaved ? "bookmark" : "bookmark-outline"}
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>
      ) : null,
    })
    
    if (data) {
      getSavedById();
    }
  }, [navigation, data, isSaved])

  const getSavedById = async () => {
    const dataSaved = await fetchSavedById(data.id);
    setIsSaved(dataSaved);
  }

  const saveRecipe = () => {
    dispatch(addSaved(data));
    getSavedById();
  }

  const removeRecipe = () => {
    dispatch(deleteSaved(isSaved.docId))
    getSavedById();
  }


  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{ uri: data.image }}
        resizeMode="cover"
        style={styles.imageRecipe}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{data.name}</Text>
        <View style={styles.infoContainer}>
            <View style={[styles.infoContainer, {
                borderRightWidth: 1,
            }]}>
              <Ionicons name="star" size={24} color={colors.start} />
              <Text style={styles.info}>{data.rating}</Text>
            </View>
            <View style={[styles.infoContainer, {
                paddingLeft: 8,
                borderRightWidth: 1,
            }]}>
              <Ionicons name="timer-outline" size={24} color={colors.primary} />
              <Text style={styles.info}>{data.cookTimeMinutes} mins</Text>
            </View>
            <View style={[styles.infoContainer, {
                paddingLeft: 8,
                borderRightWidth: 1,
            }]}>
              <Ionicons name="cellular-outline" size={24} color={colors.primary} />
              <Text style={styles.info}>{data.difficulty}</Text>
            </View>
            <View style={[styles.infoContainer, {
                paddingLeft: 8,
            }]}>
              <Ionicons name="scale-outline" size={24} color={colors.primary} />
              <Text style={styles.info}>{data.caloriesPerServing} Cal</Text>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsContainer}>
            {data.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredient}>{ingredient}{index !== data.ingredients.length - 1 && ', '}</Text>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {data.instructions.map((instruction, index) => (
                <Text key={index} style={styles.instruction}>{index + 1}.{' '}{instruction}</Text>
            ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imageRecipe: {
    backgroundColor: colors.border,
    height: 300,
  },
  contentContainer: {
    flex: 1,
    marginTop: -16,
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 24,
    fontFamily: "Figtree-Bold",
    color: colors.text,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingRight: 10,
    borderColor: colors.border,
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    fontFamily: "Figtree-SemiBold",
    color: colors.primary,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Figtree-Bold",
    color: colors.text,
    marginBottom: 6,
  },
  ingredientsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  ingredient: {
    fontSize: 16,
    fontFamily: "Figtree-Medium",
    color: colors.text,
  },
  instruction: {
    fontSize: 16,
    fontFamily: "Figtree-Medium",
    color: colors.text,
    marginBottom: 6,
  },
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
});

export default RecipeDetailScreen;

