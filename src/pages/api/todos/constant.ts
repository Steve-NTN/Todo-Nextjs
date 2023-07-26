import { TODO_TYPES } from "@/constants";
import { responseType } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse<responseType>) => {
  res.status(200).json({
    data: {
      todoTypes: TODO_TYPES,
    },
  });
};

export default handler;
