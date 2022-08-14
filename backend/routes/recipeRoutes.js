const express = require("express");
const router = express.Router();
const {
  postRecipe,
  getMyRecipes,
  editRecipe,
  getRecipeById,
  getRecipes,
  deleteRecipeById,
} = require("../controllers/recipesController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/fileUploadMiddleware");
// POST and EDIT and DELETE a recipe
router.post("/", protect, upload.single("image"), postRecipe);
router.put("/:id", protect, editRecipe);
router.delete("/:id", protect, deleteRecipeById);

// GET list of user's recipes
router.get("/myRecipes", protect, getMyRecipes);

// GET public recipes and single recipe
router.get("/", getRecipes);
router.get("/:id", getRecipeById);

module.exports = router;
