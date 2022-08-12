const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const createJWT = ({ payload }) => {
  const JWT_SECRET = "q4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D";
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30" });
  return token;
};

const isTokenValid = (token) => {
  const JWT_SECRET = crypto.randomBytes(64).toString("hex");
  jwt.verify(token, JWT_SECRET)
};

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  const NODE_ENV = "development";

  // res.cookie('accessToken', accessTokenJWT, {
  //   httpOnly: true,
  //   secure: NODE_ENV === 'development',
  //   signed: true,
  //   expires: new Date(Date.now() + oneDay),
  // });

  // res.cookie('refreshToken', refreshTokenJWT, {
  //   httpOnly: true,
  //   secure: NODE_ENV === 'development',
  //   signed: true,
  //   expires: new Date(Date.now() + longerExp),
  // });
};
// const attachSingleCookieToResponse = ({ res, user }) => {
//   const token = createJWT({ payload: user });

//   const oneDay = 1000 * 60 * 60 * 24;

//   res.cookie('token', token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === 'production',
//     signed: true,
//   });
// };

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
