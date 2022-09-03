const jwt = require("jsonwebtoken");

const requireSignin = (token) => jwt.verify(token, "4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(")

exports.authenticateUser = async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  console.log("auth", authHeader);
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    console.log("token", token)
  }

  if (!token) {
    throw new Error("tokenError");
  }
  try {
    const payload = requireSignin(token);
    console.log("payload", payload);
    // Attach the user and his permissions to the req object
    req.user = {
      _id: payload._id,
    };

    next();
  } catch (error) {
    throw new Error("Error");
  }
};

