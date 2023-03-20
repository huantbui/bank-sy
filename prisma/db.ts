import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default prisma

prisma.$use(async (params, next) => {
  return next(params)
})
