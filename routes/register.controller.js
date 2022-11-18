import { genPassword } from "../lib/utils.js";
import { isUserExists } from "../models/register.modal.js";
import { User } from "../models/user.js";
import { issueJWT } from "../lib/utils.js";

export const postRegisterController = async function (req, res, next) {
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const user = new User({
    username: req.body.username,
    salt: salt,
    hash: hash,
  });

  if (await isUserExists(user)) {
    return res.status(500).json({
      message: "user already exists!",
      code: 500,
    });
  } else {
    return user.save().then((user) => {
      const jwt = issueJWT(user);
      return res.status(201).json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    });
  }
};
