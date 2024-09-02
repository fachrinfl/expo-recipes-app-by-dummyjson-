import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import colors from "../themes/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ItemRecipe = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("RecipeDetailScreen", { recipeId: item.id })
      }
      style={styles.itemContainer}
    >
      <Image
        source={{ uri: item.image }}
        resizeMode="cover"
        style={styles.imageRecipe}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={colors.start} />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tagContainer}>
              <Text style={styles.tag}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
  },
  imageRecipe: {
    backgroundColor: colors.border,
    height: 78,
    width: 78,
    borderRadius: 8,
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontFamily: "Figtree-Bold",
    color: colors.text,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontFamily: "Figtree-SemiBold",
    color: colors.primary,
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tagContainer: {
    paddingHorizontal: 8,
    height: 24,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.border,
    marginRight: 6,
    justifyContent: "center",
  },
  tag: {
    fontSize: 12,
    fontFamily: "Figtree-Medium",
    color: colors.text,
  },
});

export default ItemRecipe;
