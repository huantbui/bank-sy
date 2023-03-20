import { differenceInCalendarDays } from "date-fns"
import { Request, Response } from "express"
import db from "../prisma/db"

const TODAY = new Date("2023-01-31") // new Date()

const getInterest = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    await db.user.findUniqueOrThrow({
      where: { id: userId }
    })
    const transactions = await db.transaction.findMany({
      select: {
        amount: true,
        createdAt: true
      },
      where: { userId }
    })
    const total = transactions.reduce((acc, curr) => {
      const dateDiff = differenceInCalendarDays(TODAY, curr.createdAt) + 1
      const accrue = dateDiff * (0.02 / 365) * curr.amount.toNumber()
      acc = acc + accrue
      return acc
    }, 0)
    return res.status(200).send({
      accrue: Number(total.toFixed(2))
    })
  } catch (error) {
    return res.status(500).send()
  }
}

export default getInterest