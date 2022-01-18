// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Status from "http-status-codes";
import Twitter from "twitter-v2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(Status.BAD_REQUEST).send("");
  }

  const body = req.body;

  const client = new Twitter({
    bearer_token: body.bearer_token,
  });

  const { data } = await client.get(`lists/${body.id}/tweets`, {
    expansions: "author_id",
    "user.fields": "created_at,profile_image_url,name",
  });

  res.status(200).json({ data: data });
}
