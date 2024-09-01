import axios from "axios";

export const fetchRecipes = async (params) => {
  const response = await axios.get("https://dummyjson.com/recipes/search", {
    params,
  });
  return response.data;
};

export const fetchRecipeById = async (id) => {
  const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
  return response.data;
};
