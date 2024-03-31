const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../jwt/verifyTokenUser");

//Get user
router.get("/:id", verifyTokenAnhAuthorizationUser, async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others });
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenUser, async (req, res) => {
  const user = await User.findById(req.params.id);
  !user && res.status(401).json("Wrong credential");

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SEC
  );
  const OriginPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  OriginPassword !== req.body.password &&
    res.status(401).json("Wrong credential");

  if (req.body.newUser.password) {
    req.body.newUser.password = CryptoJS.AES.encrypt(
      req.body.newUser.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body.newUser,
      },
      { new: true }
    );
    const { password, ...others } = updateUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", verifyTokenAnhAuthorizationUser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
