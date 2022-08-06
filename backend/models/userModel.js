const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Моля добавете име"] },
    email: {
      type: String,
      required: [true, "Моля добавете имейл"],
      unique: true,
    },
    password: { type: String, required: [true, "Моля добавете парола"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
