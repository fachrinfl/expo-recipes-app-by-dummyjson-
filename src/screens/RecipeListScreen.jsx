import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../services/api-services";
import colors from "../themes/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const limitPage = 10;

const RecipeListScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["fetchRecipes", search],
    queryFn: ({ pageParam }) =>
      fetchRecipes({
        limit: limitPage,
        skip: limitPage * (pageParam - 1),
        q: search
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, AllPages) => {
      const totalPage = Math.ceil(lastPage.total / limitPage);
      const currentPage = AllPages.length;
      const morePageExist = currentPage < totalPage;
      if (!morePageExist) {
        return undefined;
      }

      return AllPages.length + 1;
    },
    select: (data) => ({
      ...data,
      pages: data.pages.flatMap((page) => page.recipes),
    }),
  });

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
        data={data?.pages || []}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={[colors.primary]}
          />
        }
        renderItem={({ item }) => (
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
        )}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator
              size="small"
              color={colors.primary}
              style={styles.footerLoading}
            />
          ) : null
        }
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
