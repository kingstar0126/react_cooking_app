const express = require("express");
const router = express.Router();
const {
  postRecipe,
  getMyRecipes,
  editRecipe,
  getRecipeById,
  getRecipes,
  deleteRecipeById,
  getLastThree,
  postComment,
} = require("../controllers/recipesController");

const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./frontend/public/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);

    cb(null, file.originalname);
    // UNUQIE FILENAME
    //cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// POST, EDIT and DELETE recipes
router.post("/", protect, upload.single("photos"), postRecipe);
router.put("/:id", protect, upload.single("photos"), editRecipe);
router.delete("/:id", protect, deleteRecipeById);

// GET list of user's recipes
router.get("/myRecipes", getMyRecipes);

// GET public recipes and single recipe
router.get("/", getRecipes);
router.get("/lastThree", getLastThree);
router.get("/:id", getRecipeById);

// POST and DELETE comments
router.post("/comments", protect, postComment);

module.exports = router;
