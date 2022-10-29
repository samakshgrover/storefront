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

      res.json({ token });
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
    console.log(username, password);
    const user = await store.findUser(username);
    console.log(user);
    if (!user) throw new Error(`No user with this Username ${username}`);
    const match = await compHash(password, user.password_hash);
    console.log(match);
    if (!match) throw new Error("Incorrect password");
    const token = signToken(user.user_id);
    console.log(token);
    res.json({ token });
  } catch (err) {
    res.status(401).send(err);
  }
}
