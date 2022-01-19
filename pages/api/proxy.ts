import type { NextApiRequest, NextApiResponse } from "next";
import Status from "http-status-codes";
import Twitter from "twitter-v2";
import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  if (req.method !== "POST") {
    return res.status(Status.BAD_REQUEST).send("");
  }

  const body = req.body;
  console.log(body);

  const client = new Twitter({
    bearer_token: body.bearer_token,
  });

  const result = await client.get(`lists/${body.id}/tweets`, {
    expansions: "author_id",
    "user.fields": "created_at,profile_image_url,name",
  });

  res.status(200).json({ result: result });
}

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);
