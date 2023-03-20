import { TransactionType } from "@prisma/client"
import { Request, Response } from "express"
import db from "../prisma/db"

const postTransaction = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    await db.user.findUniqueOrThrow({
      where: { id: userId }
    })
    const { amount, createdAt }: { amount: number; createdAt: string } =
      req.body
    await db.transaction.create({
      data: {
        amount,
        type: 0 < amount ? TransactionType.DEPOSIT : TransactionType.WITHDRAWAL,
        userId,
        createdAt: new Date(createdAt ?? "2023-01-01")
      }
    })
    return res.status(202).send()
  } catch (error) {
    console.log("post-transaction", error)
    return res.status(500).send()
  }
}

export default postTransaction
