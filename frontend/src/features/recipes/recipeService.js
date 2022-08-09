const addRecipe = async (recipe, token) => {
  const response = await fetch("http://localhost:5000/api/posts", {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 201) {
    const addedRecipe = await response.json();
    return addedRecipe;
  }
};

const recipeService = {
    addRecipe
}

export default recipeService