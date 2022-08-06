const express = require("express");
const router = express.Router();
const { postRecipe } = require("../controllers/recipesController");

router.post("/", postRecipe);
//router.put("/edit/:id", editRecipe);

module.exports = router;
