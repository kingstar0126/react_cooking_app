const asyncHandler = require("express-async-handler");

const Recipe = require("../models/recipeModel");

// @desc
// @route
// @access
const postRecipe = asyncHandler(async (req, res) => {
  const { title, products, preparation, suitableFor } = req.body;

  // Validation
  if (!title || !products || !preparation || !suitableFor) {
    res.status(400);
    throw new Error("Моля попълнете всички полета");
  }

  // Create user
  const recipe = await Recipe.create({
    title,
    products,
    preparation,
    suitableFor,
  });

  if (recipe) {
    res.status(201).json({
      _id: recipe._id,
      title: recipe.title,
      products: recipe.products,
      preparation: recipe.preparation,
      suitableFor: recipe.suitableFor,
    });
  } else {
    res.status(400);
    throw new Error("Невалидно въведена информация");
  }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
// const editRecipe = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   // Check user and passwords matchs
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid credentials");
//   }
// });

// // Generate token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

module.exports = {
  postRecipe,
};
