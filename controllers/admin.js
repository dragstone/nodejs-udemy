const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
  product
    .save()
    .then((result) => {
      console.log("created product", result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));

  // req.user
  //   .createProduct({
  //     title: title,
  //     price: price,
  //     imageUrl: imageUrl,
  //     description: description,
  //   })
  //   .then((result) => {
  //     console.log("created product", result);
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log(typeof editMode);
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl, prodId);
  product
    .save()
    .then((result) => {
      console.log("updated product", result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.deleteProducts = (req, res, next) => {
  const prodId = req.params.productId;
  Product.deleteById(prodId)
    .then((result) => {
      console.log("destroyed product", result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
