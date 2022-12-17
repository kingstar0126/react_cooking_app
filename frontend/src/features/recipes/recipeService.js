// CREATE recipe
const addRecipe = async (recipe, token) => {
  const response = await fetch(`${process.env.BACKEND_URI}/api/posts`, {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 201) {
    const addedRecipe = await response.json();
    return addedRecipe;
  }
};

// GET My recipes
const getMine = async (token) => {
  const response = await fetch(
    `${process.env.BACKEND_URI}/api/posts/myRecipes`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    const recipes = await response.json();
    return recipes;
  }
};

// GET All recipes
const getAllRecipes = async () => {
  const response = await fetch(`${process.env.BACKEND_URI}/api/posts`);

  if (response.status === 200) {
    const recipes = await response.json();
    return recipes;
  }
};

// GET Last Three recipes
const getLastThree = async () => {
  const response = await fetch(
    `https://cook-master.onrender.com/api/posts/lastThree`
  );

  if (response.status === 200) {
    const recipes = await response.json();
    return recipes;
  }
};

// GET Single Recipe
const getSingle = async (recipeId) => {
  const response = await fetch(
    `https://cook-master.onrender.com/api/posts/` + recipeId
  );

  if (response.status === 200) {
    const recipe = await response.json();
    return recipe;
  }
};

// DELETE a recipe
const deleteRecipe = async (recipeId, token) => {
  const response = await fetch(
    `${process.env.BACKEND_URI}/api/posts/` + recipeId,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    return response.message;
  }
};

// UPDATE a recipe
const updateRecipe = async (recipe, recipeId, token) => {
  const response = await fetch(
    `${process.env.BACKEND_URI}/api/posts/` + recipeId,
    {
      method: "PUT",
      body: JSON.stringify(recipe),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 201) {
    const updatedRecipe = await response.json();
    return updatedRecipe;
  }
};

const recipeService = {
  addRecipe,
  getMine,
  getAllRecipes,
  getSingle,
  deleteRecipe,
  updateRecipe,
  getLastThree,
};

export default recipeService;
