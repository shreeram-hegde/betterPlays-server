import User from "../model/User.js";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) return res.sendStatus(401); // no token

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); // token not in DB

    // Verify token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // if (foundUser.username !== decoded.username) return res.sendStatus(403);

    // Create new access token
    const accessToken = jwt.sign(
      { username: foundUser.username, email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.sendStatus(403); // invalid token
  }
};

export default handleRefreshToken;
