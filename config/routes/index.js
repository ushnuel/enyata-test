const express = require("express");
const router = express.Router();

router.get("/", async (_, res) => {
  res.status(200).json({
    message: "Hello!",
    data: {
      platform: "Welcome to Enyata Test API",
      version: "1.0"
    }
  });
});

const userController = require("../../api/controllers/user_controller");

router.post("/users/create", userController.create);
router.get("/users/retrieve", userController.read);
router.put("/users/:id/update", userController.update);
router.delete("/users/:id/delete", userController.delete);

module.exports = router;