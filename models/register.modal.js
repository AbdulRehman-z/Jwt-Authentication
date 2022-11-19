import { User } from "./user.js";

export const isUserExists = async (user) => {
  return await User.findOne({ username: user.username });
};

/**
 * -------------- Trash Code ----------------
 */

// const DEFAULT_ID = 0;
// const saveUser = async (user) => {
//   const user = new User(...user);

//   try {
//     return await user.save();
//   } catch (error) {
//     throw error;
//   }
// };

// const getLatestUser = async () => {
//   try {
//     const latestUser = await User.findOne().sort("-userId");
//     if (!latestUser) {
//       return DEFAULT_ID;
//     }

//     return latestUser.userId;
//   } catch (error) {
//     throw error;
//   }
// };

// export const registerNewUser = async (newUser) => {
//   try {
//     const latestUser = (await getLatestUser()) + 1;
//     console.log(latestUser);
//     const user = Object.assign(newUser, {
//       userId: latestUser,
//     });

//     await saveUser(user);
//   } catch (error) {
//     throw error;
//   }
// };
