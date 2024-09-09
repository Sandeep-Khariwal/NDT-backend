import jwt, {Secret} from "jsonwebtoken"

export const generateAccessToken = (email: { email: string }): string => {
    return jwt.sign(email, process.env.TOKEN_SECRET as Secret, { expiresIn: "365d" });
  };