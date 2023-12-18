const userController = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const verifyToken = require("../middlewares/verifyToken");

userController.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) throw new Error("No such user");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

userController.put("/:id", verifyToken, async (req, res) => {
  console.log(req.body);
  if (req.params.id === req.user.id.toString()) {
    try {
      if (req.body.password) {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = newPassword;
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(403).json({ msg: "You can update only your profile" });
  }
});

userController.delete("/:id", verifyToken, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(500).json({ msg: "No such user" });
  }

  if (req.user.id.toString() === user._id.toString()) {
    try {
      await User.findByIdAndDelete(req.params.id);

      return res.status(200).json({ msg: "Successfully deleted" });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(403).json({ msg: "You can delete only your profile" });
  }
});

// userController.get("/find-users-with-properties", async (req, res) => {
//   try {
//     const usersWithProperties = await User.aggregate([
//       {
//         $lookup: {
//           from: "properties", // The name of the properties collection
//           localField: "_id", // The field from the users collection
//           foreignField: "currentOwner", // The field from the properties collection
//           as: "properties", // The alias for the resulting array in the user document
//         },
//       },
//       {
//         $match: {
//           properties: { $ne: [] }, // Filter only users with at least one property
//         },
//       },
//       {
//         $project: {
//           // Exclude the _id field from the result

//           password: 0, // Exclude the password field
//         },
//       },
//     ]);

//     const userNamesWithProperties = usersWithProperties.map(
//       (user) => user.username
//     );

//     return res.status(200).json(userNamesWithProperties);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

userController.get("/find-users-with-properties", async (req, res) => {
  try {
    const userNamesWithProperties = await User.aggregate([
      {
        $lookup: {
          from: "properties", // The name of the properties collection
          localField: "_id", // The field from the users collection
          foreignField: "currentOwner", // The field from the properties collection
          as: "properties", // The alias for the resulting array in the user document
        },
      },
      {
        $match: {
          properties: { $ne: [] }, // Filter only users with at least one property
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          password: 0, // Exclude the password field
          properties: 0, // Exclude the properties field (if you don't need it)
        },
      },
      {
        $project: {
          username: 1, // Include the username field
          profileImg: 1, // Include the profileImg field
        },
      },
    ]);

    return res.status(200).json(userNamesWithProperties);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

userController.get("/find-all-users", async (req, res) => {
  try {
    const allUsers = await User.find(
      {},
      {
        _id: 0,
        password: 0,
        email: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,

        /* exclude other fields here */
      }
    );

    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
module.exports = userController;
