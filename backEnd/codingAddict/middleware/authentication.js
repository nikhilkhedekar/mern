// const CustomError = require('../errors');
const { isTokenValid, attachCookiesToResponse } = require('../utils/index');
const Token = require('../models/Token');

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.cookies;//req.signedCookies
  // const refreshToken = decodeURIComponent(getRefreshToken), accessToken = decodeURIComponent(getAccessToken); 
  console.log("cookie", req.cookies);
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new Error("Error");
      // throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new Error("Error")
    // throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error("Error");
      // throw new CustomError.UnauthorizedError(
      //   'Unauthorized to access this route'
      // );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
