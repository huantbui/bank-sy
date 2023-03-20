import { TransactionType } from "@prisma/client"
import db from "./db"

async function main() {
  try {
    await db.user.deleteMany()
    await db.transaction.deleteMany()
    const user1 = await db.user.create({
      data: {
        id: "c66c659d-8f6e-4378-b409-68dfe72f02a0",
        firstName: "Abe",
        lastName: "Uno",
        transactions: {
          createMany: {
            data: [
              {
                amount: 10000,
                type: TransactionType.DEPOSIT,
                createdAt: new Date("2023-01-01")
              }
            ]
          }
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true
      }
    })

    const user2 = await db.user.create({
      data: {
        id: "68a67472-d487-4bb0-b5a9-08a5dc4fd954",
        firstName: "Beata",
        lastName: "Dos",
        transactions: {
          createMany: {
            data: [
              {
                amount: 10000,
                type: TransactionType.DEPOSIT,
                createdAt: new Date("2023-01-01")
              },
              {
                amount: 5000,
                type: TransactionType.DEPOSIT,
                createdAt: new Date("2023-01-05")
              }
            ]
          }
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true
      }
    })

    const user3 = await db.user.create({
      data: {
        id: "a712c27f-f870-42f1-9533-814c07150d92",
        firstName: "Chris",
        lastName: "Tres",
        transactions: {
          createMany: {
            data: [
              {
                amount: 10000,
                type: TransactionType.DEPOSIT,
                createdAt: new Date("2023-01-01")
              },
              {
                amount: -5000,
                type: TransactionType.WITHDRAWAL,
                createdAt: new Date("2023-01-05")
              }
            ]
          }
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true
      }
    })

    const user4 = await db.user.create({
      data: {
        id: "118f6fdc-d127-47af-aa42-d0ee479c0e49",
        firstName: "Doug",
        lastName: "Quatro",
        transactions: {
          createMany: {
            data: [
              {
                amount: 10000,
                type: TransactionType.DEPOSIT,
                createdAt: new Date("2023-01-01")
              },
              {
                amount: 5000,
                type: TransactionType.DEPOSIT,
                createdAt: new Date("2023-01-15")
              },
              {
                amount: -5000,
                type: TransactionType.WITHDRAWAL,
                createdAt: new Date("2023-01-27")
              }
            ]
          }
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true
      }
    })
    console.log('Seed data is built, please use these users as the API path')
    console.table([user1, user2, user3, user4])
  } catch (error) {
    console.error("error", error)
  }
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
