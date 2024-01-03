const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const { mongoConnect } = require("./util/databse");

const User = require("./models/user");

// const sequelize = require("./util/databse");

// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6593d941449b1d910864c30d")
    .then((user) => {
      console.log("user", user);
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});

// mongoose
//   .connect(
//     "mongodb+srv://Asmiriti:6CGbzUgkTPRPrGXE@cluster0.cfspp.mongodb.net/shop?retryWrites=true&w=majority"
//   )
//   .then(result=>{
//     app.listen(3000);
//   })
//   .catch((err) => console.log(err));

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   //   .sync({ force: true })
//   .sync()
//   .then((result) => {
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "asmiriti", email: "asmiritik@gmail.com" });
//     }
//     return user;
//   })
//   .then((user) => {
//     return user.createCart();
//   })
//   .then(() => {
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
