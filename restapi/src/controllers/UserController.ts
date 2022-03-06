import {User} from "../model/User";
import { RequestHandler } from "express";

export const findUsers: RequestHandler = async (req, res) => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      res.json(error);
    }
};

