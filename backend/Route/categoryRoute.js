const express = require("express");

const {
  addCategory,
  viewCategories,
  updateCategory,
  deleteCategory,
  findCategory,
} = require("../Controller/categoryController");
const router = express.Router();

router.post("/addcategory", addCategory);
router.get("/viewcategory", viewCategories);
router.put("/updatecategory/:id", updateCategory);
router.delete("/deletecategory/:id", deleteCategory);
router.get("/findcategory/:id", findCategory);

module.exports = router;