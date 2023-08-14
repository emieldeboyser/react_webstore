import { Router } from "express";
import passport from "passport";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { initClient } from "../db/mongo.js";
import { createUserData, hash } from "../middleware/auth/hash.js";
import { ExtractJwt } from "passport-jwt";

//Initialize MongoDB client and database:
const client = await initClient();
const db = client.db();

const registerRegularRoutes = (app) => {
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!user) {
        return res.status(401).json({ error: "No user found" });
      }
      if (user) {
        const givenPassword = hash(user, req.body.password);
        if (givenPassword !== user.password) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60 * 60,
      });

      delete user.password;
      delete user.salt;
      delete user.saltParam;
      return res.json({ token, ...user });
    })(req, res, next);
  });

  app.post("/register", async (req, res) => {
    const {
      username,
      password,
      email,
      birthdate,
      phone,
      address_street,
      address_number,
      address_postalcode,
      address_city,
      role,
    } = req.body;
    try {
      // Check if the username already exists
      const existingUser = await db.collection("users").findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Create a new user
      const newUser = createUserData({
        username,
        password,
        email,
        birthdate,
        phone,
        address_street,
        address_number,
        address_postalcode,
        address_city,
        role,
      });

      // Insert the user into the database
      await db.collection("users").insertOne(newUser);

      // Generate a new token for the registered user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60,
      });

      delete newUser.password;
      delete newUser.salt;
      delete newUser.saltParam;
      res.json({ token, ...newUser });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/check-coupon", async (req, res) => {
    const { couponCode } = req.body;

    try {
      const coupon = await db
        .collection("coupons")
        .findOne({ coupon_name: couponCode });
      if (coupon) {
        res.status(200).json({ valid: true, discount: coupon.discount });
      } else {
        res.status(404).json({ valid: false });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/checkout", async (req, res) => {
    const order = {
      ...req.body,
    };
    await db.collection("orders").insertOne(order);

    res.json(order);
  });

  app.get("/profile/orders/:id", async (req, res) => {
    // not working
    // const orders = await db
    //   .collection("orders")
    //   .find({ user_id: ObjectId(id) })
    //   .toArray();
    // res.json(orders);
  });
};

const registerAdminRoutes = (app) => {
  const adminRouter = Router();

  adminRouter.use(
    passport.authenticate("jwt", { session: false, failWithError: true })
  );
  // users
  adminRouter.get("/users", async (req, res) => {
    const user = await db.collection("users").find().toArray();
    res.json(user);
  });

  adminRouter.delete("/users/:id", async (req, res) => {
    const id = req.params.id;

    await db.collection("users").deleteOne({
      _id: ObjectId(id),
    });

    res.json({});
  });

  adminRouter.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const users = await db.collection("users").findOne({
      _id: ObjectId(id),
    });

    if (users) {
      res.json(users);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  adminRouter.patch("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await db.collection("users").findOne({
      _id: ObjectId(id),
    });

    if (user) {
      const { _id, ...data } = req.body;
      const newData = { ...user, ...data };
      await db.collection("users").replaceOne({ _id: ObjectId(id) }, newData);

      res.json(newData);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  // products
  adminRouter.get("/catalogus", async (req, res) => {
    const products = await db.collection("products").find().toArray();
    res.json(products);
  });

  adminRouter.get("/catalogus/:id", async (req, res) => {
    const id = req.params.id;
    const products = await db.collection("products").findOne({
      _id: ObjectId(id),
    });

    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  adminRouter.get("/product", async (req, res) => {
    const products = await db.collection("products").find().toArray();
    res.json(products);
  });

  adminRouter.patch("/product/:id", async (req, res) => {
    const id = req.params.id;
    const product = await db.collection("products").findOne({
      _id: ObjectId(id),
    });

    if (product) {
      const { _id, ...data } = req.body;
      const newData = { ...product, ...data };
      await db
        .collection("products")
        .replaceOne({ _id: ObjectId(id) }, newData);

      res.json(newData);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  adminRouter.delete("/product/:id", async (req, res) => {
    const id = req.params.id;

    await db.collection("products").deleteOne({
      _id: ObjectId(id),
    });

    res.json({});
  });

  adminRouter.post("/product", async (req, res) => {
    const product = {
      ...req.body,
    };
    await db.collection("products").insertOne(product);

    res.json(product);
  });

  // coupons
  adminRouter.get("/coupons", async (req, res) => {
    const products = await db.collection("coupons").find().toArray();
    res.json(products);
  });

  adminRouter.post("/coupons", async (req, res) => {
    const coupon = {
      ...req.body,
    };
    await db.collection("coupons").insertOne(coupon);

    res.json(coupon);
  });

  adminRouter.delete("/coupons/:id", async (req, res) => {
    const id = req.params.id;

    await db.collection("coupons").deleteOne({
      _id: ObjectId(id),
    });

    res.json({});
  });

  adminRouter.patch("/coupons/:id", async (req, res) => {
    const id = req.params.id;
    const coupon = await db.collection("coupons").findOne({
      _id: ObjectId(id),
    });

    if (coupon) {
      const { _id, ...data } = req.body;
      const newData = { ...coupon, ...data };
      await db.collection("coupons").replaceOne({ _id: ObjectId(id) }, newData);

      res.json(newData);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  // Attach the adminRouter to the main Express app without specifying a base path
  app.use(adminRouter);
};

const registerRoutes = async (app) => {
  registerRegularRoutes(app);
  registerAdminRoutes(app);

  //// Custom error handler middleware to handle JWT authentication errors
  app.use((err, req, res, next) => {
    if (err.name === "AuthenticationError") {
      res.status(401).json({ error: "Token expired" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

export { registerRoutes };
