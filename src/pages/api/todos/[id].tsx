import { DEFAULT_BUG, TODOITEMSPECHAR } from "@/constants";
import { responseType } from "@/types";
import { genRandomString } from "@/utils/stringUtil";
import type { NextApiRequest, NextApiResponse } from "next";
import { getTodos, putTodo } from "@/services/memoryDataService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  const { id } = req.query;

  // Handle with get method
  if (req.method === "GET") {
    const filterData = getTodos()
    .find((todo) => todo?.id === id);
    
    console.log(id, getTodos())

    if (!filterData) {
      res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      data: {
        ...filterData,
      },
    });
  }

  // Handle update todo
  if (req.method === "PUT") {
    const bodyJson = await JSON.parse(req.body);

    let crtTodo = getTodos().find((todo) => todo?.id === id);
    if (!crtTodo) {
      res.status(404).json({ message: "Todo not found" });
    }

    try {
      let avaTodoItems: any[] = [];
      (bodyJson.items || [])?.map((item: any) => {
        let genId =
          item?.id || `${TODOITEMSPECHAR}${id}_${genRandomString(10)}`;
        avaTodoItems.push({
          id: genId,
          title: item?.title,
          isCompleted: item?.isCompleted,
          caculatorNumber: item?.caculatorNumber,
        });
      });
      putTodo({ ...bodyJson, items: avaTodoItems });
      res.status(200).json({
        message: "Update successful",
      });
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  }

  res.status(500).json({ message: DEFAULT_BUG });
}
