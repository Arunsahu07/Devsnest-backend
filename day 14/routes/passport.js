const router = require("express").Router();

const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../utils/auth");

//register for user
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});
//register for admin
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});
//login for user
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});
//login for admin
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// routes avaiable with userAuth

router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

//user protected route
router.get(
  "/user-protected",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

//admin protected route
router.get(
  "/admin-protected",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello ADMIN !!!");
  }
);

module.exports = router;
