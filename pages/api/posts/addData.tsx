import prisma from "../../../prisma/client"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please signin to Add Data" })
    }

    
    const city: string = req.body.city
    const country: string = req.body.country
    const phone: string = req.body.phone

    //Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    })

    //Add Data
    try {
      const result = await prisma.data.create({
        data: {
          city,
            country,
            phone,
          userId: prismaUser.id,
        },
      })
      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" })
    }
  }
}
