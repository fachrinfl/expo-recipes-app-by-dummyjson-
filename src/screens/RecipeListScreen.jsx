import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from "react-native";
import colors from "../themes/colors";
import ItemRecipe from "../components/ItemRecipe";
import dataRecipes from "../constants/data.json";

const RecipeListScreen = () => {
  const [search, setSearch] = useState("");
  return (
    <View style={styles.screen}>
      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          placeholder="Type something..."
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={dataRecipes.recipes.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ItemRecipe item={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
  },
  footerLoading: {
    alignSelf: "center",
    margin: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  searchInput: {
    backgroundColor: colors.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: "Figtree-SemiBold",
  },
});

export default RecipeListScreen;
