const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Recipe = require("../models/recipeModel");

// @desc    Get all recipes
// @route   GET api/posts
// @access  public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});

  if (recipes) {
    res.status(200).json(recipes);
  }
});

// @desc    Get single recipe
// @route   api/posts/:id
// @access  public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404);
    throw new Error("Рецептата не е намерена");
  }

  res.status(200).json(recipe);
});

// @desc        Post a recipe
// @route       POST /api/posts
// @access      for registered and logged in Users only
const postRecipe = asyncHandler(async (req, res) => {
  const { title, products, preparation, suitableFor } = req.body;
  const photos = req.file.filename;
  // Validation
  if (!title || !products || !preparation || !suitableFor) {
    res.status(400);
    throw new Error("Моля попълнете всички полета");
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Create recipe
  const recipe = await Recipe.create({
    user: req.user.id,
    title,
    products,
    preparation,
    suitableFor,
    photos,
  });

  if (recipe) {
    res.status(201).json(recipe);
  } else {
    res.status(400);
    throw new Error("Невалидно въведена информация");
  }
});

// @desc    Edit a recipe
// @route   PUT api/posts/:id
// @access  private
const editRecipe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404);
    throw new Error("Рецептата не е намерена");
  }

  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params, req.body, {
    new: true,
  });

  res.status(200).json(updatedRecipe);
});

// @desc    get my list of recipes
// @route   api/posts/myRecipes
// @access  private
const getMyRecipes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const recipes = await Recipe.find({ user: req.user.id });

  if (recipes.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(recipes);
});

// @desc    Delete recipe
// @route   DELETE api/posts/:id
// @access  private
const deleteRecipeById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404);
    throw new Error("Рецептата не е намерена");
  }

  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await recipe.remove();

  res.status(200).json({ sucess: true });
});

module.exports = {
  postRecipe,
  getMyRecipes,
  editRecipe,
  getRecipeById,
  getRecipes,
  deleteRecipeById,
  uploadPhoto
};
