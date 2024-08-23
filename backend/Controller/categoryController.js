const CategoryModel = require("../Model/categoryModel");

exports.addCategory = async (req, res) => {
    let category = await CategoryModel.findOne({ categoryName: req.body.categorName })

    if (!category) {
        let category = new CategoryModel({
            categoryName: req.body.categoryName
        })
        category = await category.save()
        if (!category) {
            return res.status(400).json({ error: 'something went wrong' })
        }
        res.send(category)
    }
    else {
        return res.status(400).json({ error: 'Category already exists' })
    }

}

exports.viewCategories = async (req, res) => {
    let category = await CategoryModel.find()
    if (!category) {
        return res.status(400).json({ error: 'something went wrong' })
    }
    res.send(category)
}

exports.updateCategory = async (req, res) => {
    let category = await CategoryModel.findByIdAndUpdate(req.params.id, {
        categoryName: req.body.categoryName
    }, { new: true })
    if (!category) {
        return res.status(400).json({ error: 'something went wrong' })
    }

    res.send(category)
}

exports.deleteCategory = async (req, res) => {
    let category = await CategoryModel.findByIdAndDelete(req.params.id)
    if (!category) {
        return res.status(400).json({ error: "Error" })
    } else {
        if (category == null) {
            return res.status(400).json({ error: "Category not found" })
        } else {
            return res.status(200).json({ message: 'deleted succesfully' })
        }
    }


}
exports.findCategory = (req, res) => {
    CategoryModel.findById(req.params.id)
        .then((category) => {
            return res.send(category)
        })
        .catch(() => {
            return res.status(400).json({ error: "something went wrong" })
        })
}