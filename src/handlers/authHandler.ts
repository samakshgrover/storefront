import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const makeHash = async (pass: string) => {
  const hash = await bcrypt.hash(
    pass + process.env.PEPER,
    parseInt(process.env.SALT!)
  );
  console.log(hash);
  return hash;
};

export const compHash = async (pass: string, passHash: string) => {
  const result = await bcrypt.compare(pass + process.env.PEPER, passHash);
  return result;
};

export const signToken = (userId: number | string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.EXPIRES_IN,
  });
  return token;
};

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.body.userId = userId;
    console.log(userId);
    next();
  } else {
    res.status(401).json({ res: "please login before accessing this route" })
  }
}

