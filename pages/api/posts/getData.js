import prisma from "../../../prisma/client"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {

      const data = await prisma.data.findMany({
        include: {
          user: true
        },
        orderBy: {
          createdAt: "desc",
        },
      })

      return res.json(data)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" })
    }
  }
}
