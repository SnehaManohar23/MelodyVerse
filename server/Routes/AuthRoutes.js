const { register, login } = require("../Controllers/AuthControllers");
const router = require("express").Router();


router.post("/register", register);
router.post("/login", login);
router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send({ message: 'Logged out' });
});


module.exports = router;