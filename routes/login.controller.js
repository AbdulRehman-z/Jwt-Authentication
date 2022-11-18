import { User } from "../models/user.js";
import { issueJWT } from "../lib/utils.js";
import { validatePassword } from "../lib/utils.js";

export const postLoginController = async (req, res, next) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "could not find user" });
    }

    const isPasswordValid = validatePassword(
      req.body.password,
      user.hash,
      user.salt
    );

    if (isPasswordValid) {
      const jwt = issueJWT(user);
      return res.status(200).json({
        success: true,
        user: user,
        token: jwt.token,
        expires: jwt.expires,
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "password is invalid" });
    }
  });
};
