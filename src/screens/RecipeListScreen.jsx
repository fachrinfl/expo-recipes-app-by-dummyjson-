import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../services/api-services";
import colors from "../themes/colors";
import ItemRecipe from "../components/ItemRecipe";

const limitPage = 10;

const RecipeListScreen = () => {
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
          <ItemRecipe item={item} />
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
