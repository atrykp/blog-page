import dbConnect from "../../../lib/dbConnect";
import Comment from "../../../models/comment";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    const session = await getSession({ req });

    if (!session || !session.user.isAdmin) {
      res.status(401).send({ message: "Not authenticated or authorized" });
      return;
    }
    await dbConnect();
    const response = await Comment.findByIdAndDelete(id);
    res.status(201).json(response);
  } else if (req.method === "GET") {
    const { id: postId } = req.query;

    await dbConnect();
    const comments = await Comment.find({ postId });
    if (!comments) res.status(500).send({ message: "something went wrong" });
    res.status(201).json(comments);
  }
}
