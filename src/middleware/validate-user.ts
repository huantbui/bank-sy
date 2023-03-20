import { NextFunction, Request, Response } from "express"
import db from "../../prisma/db"

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id
    await db.user.findUniqueOrThrow({
      where: { id: userId }
    })
    next()
  } catch (error) {
    console.error("validate-user", error)
    return res.status(401).send()
  }
}

export default validateUser
