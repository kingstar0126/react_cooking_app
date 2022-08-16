const express = require("express");
const router = express.Router();
const {
  postRecipe,
  getMyRecipes,
  editRecipe,
  getRecipeById,
  getRecipes,
  deleteRecipeById,
  uploadPhoto,
} = require("../controllers/recipesController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cd(null, "../images");
  },
  filename: (req, file, cb) => {
    console.log(file);

    cb(null, file.originalname)
    // UNUQIE FILENAME
    //cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/", protect, upload.single('image'), postRecipe);

router.put("/:id", protect, editRecipe);
router.delete("/:id", protect, deleteRecipeById);

// GET list of user's recipes
router.get("/myRecipes", protect, getMyRecipes);

// GET public recipes and single recipe
router.get("/", getRecipes);
router.get("/:id", getRecipeById);

module.exports = router;
