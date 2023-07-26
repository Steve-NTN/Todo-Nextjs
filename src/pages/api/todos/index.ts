import { TODOSPECHAR } from "@/constants";
import { responseType } from "@/types";
import { genRandomString } from "@/utils/stringUtil";
import type { NextApiRequest, NextApiResponse } from "next";
import { getTodos, postTodo, deleteTodo } from "@/services/memoryDataService";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) => {
  // get all todos
  if (req.method === "GET") {
    res.status(200).json({ data: getTodos() });
  }

  // create new todo
  if (req.method === "POST") {
    let resData = JSON.parse(req.body);
    try {
      if (!resData.title || !resData.type) {
        res.status(500).json({ message: "Field missing" });
      }

      let randomId = `${TODOSPECHAR}_${genRandomString(10)}`;
      postTodo({ ...resData, id: randomId });
      res.status(200).json({ data: randomId, message: "Create successful" });
    } catch (error) {
      res.status(500);
    }
  }

  // delete todo
  if (req.method === "DELETE") {
    try {
      let id = `${req.query.id}`;
      if (!id) {
        res.status(500).json({ message: "Field missing" });
      }
      let crtTodo = getTodos().find((todo) => todo?.id === id);
      if (!crtTodo) {
        res.status(404).json({ message: "Todo not found" });
      }
      deleteTodo(id);
      res.status(200).json({ message: "Delete successful" });
    } catch (error) {
      res.status(500);
    }
  }
};

export default handler;
