import cors from "cors"
import express, { Application } from "express"
import Joi from "joi"
import getInterest from "./get-interests"
import validateRequest from "./middleware/validate-request"
import validateUser from "./middleware/validate-user"
import postTransaction from "./post-transaction"

const app: Application = express()

const userIdSchema = Joi.object({
  id: Joi.string()
    .guid({
      version: ["uuidv4"]
    })
    .required()
})

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    cors({
      origin: "http://localhost:7777",
      allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      optionsSuccessStatus: 200
    })
  )
  .get(
    "/:id/interests",
    validateRequest(userIdSchema, "params"),
    validateUser,
    getInterest
  )
  .post(
    "/:id",
    validateRequest(
      Joi.object({
        amount: Joi.number().precision(2).required(),
        createdAt: Joi.date().iso().optional()
      }),
      "body"
    ),
    validateRequest(userIdSchema, "params"),
    validateUser,
    postTransaction
  )

export default app
