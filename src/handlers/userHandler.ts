import { Response, Request } from "express";
import { makeHash, compHash, signToken } from "../handlers/authHandler";
import { UserStore } from "../models/userModel";

const store = new UserStore();

export const index = async (req: Request, res: Response) => {
  const result = await store.index();
  res.send({ result });
  // res.send({ result: "my test" })
};

export const create = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, password, username } = req.body;
    const passwordHash = await makeHash(password);
    const { user_id } = await store.create(
      first_name,
      last_name,
      username,
      passwordHash
    );
    if (user_id) {
      const token = signToken(user_id);
      res.json({ token, userId: user_id });
      return;
    }
    res.send({ result: null });
  } catch (error) {
    res.status(401).send(error);
  }
};

export const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await store.show(parseInt(id));
  res.send({ result });
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await store.findUser(username);
    if (!user) throw new Error(`No user with this Username ${username}`);
    const match = await compHash(password, user.password_hash);
    if (!match) throw new Error("Incorrect password");
    const token = signToken(user.user_id);
    res.json({ token });
  } catch (err) {
    res.status(401).send(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log({ id })
  const result = await store.deleteUser(id);
  res.status(204).json({ result: "deleted succesfully" });
};
