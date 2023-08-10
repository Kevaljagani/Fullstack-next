import prisma from "../../../prisma/client"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." })
  }
  if (req.method === "PATCH") {
    const dataId = req.body.id1
    try {
      const result = await prisma.data.update({
        where: {
          id: dataId,
        },
        data: {
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone
        }
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while deleting a post" })
    }
  }
}
