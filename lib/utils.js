import fs from "fs";
import jsonwebtoken from "jsonwebtoken";
import path from "path";
import crypto from "crypto";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const pathToPublicKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const PUB_KEY = fs.readFileSync(pathToPublicKey, "utf8");

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
export const genPassword = function (password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
export const validatePassword = function (password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
};

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
export const issueJWT = function (user) {
  const _id = user._id;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

/**
 * @param {*} req - The req is the request object
 * @param {*} res - The res is the response object
 * @param {*} next - The next is the next() function
 * This function is the custom jwt token verificaion implementation.
 * Basically this function is responsible for authenticating the user as a middleware.
 */

export const authenticateJwt = function (req, res, next) {
  const token = req.headers.authorization.split(" ");

  if (token[0] === "Bearer" && token[1].match(/\S+\.\S+\.\S+/) !== null) {
    try {
      const verificaion = jsonwebtoken.verify(token[1], PUB_KEY, {
        algorithms: ["RS256"],
      });

      req.jwt = verificaion;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        msg: "You are not authorized to visit this route",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      msg: "You are not authorized to visit this route",
    });
  }
};
