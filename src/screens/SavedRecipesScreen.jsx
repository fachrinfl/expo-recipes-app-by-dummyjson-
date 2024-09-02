import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import colors from "../themes/colors";
import ItemRecipe from "../components/ItemRecipe";
import { fetchSaved } from "../redux/savedSlice";

const SavedRecipesScreen = () => {
  const saved = useSelector((state) => state.saved);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSaved());
  }, []);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name={"bookmark"} size={64} color={colors.border} />
      <Text style={styles.title}>No Saved Items!</Text>
      <Text style={styles.desc}>
        You don’t have any saved items. Go to home and add some.
      </Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={saved || []}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ItemRecipe item={item} />}
        contentContainerStyle={styles.containerList}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  containerList: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 100,
  },
  title: {
    fontFamily: "Figtree-Bold",
    fontSize: 18,
    marginBottom: 15,
    color: colors.text,
    textAlign: "center",
    marginTop: 20,
  },
  desc: {
    fontFamily: "Figtree-SemiBold",
    fontSize: 14,
    textAlign: "center",
    color: colors.text,
  },
});

export default SavedRecipesScreen;
