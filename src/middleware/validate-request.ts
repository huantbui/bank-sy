import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const validateRequest = (
  schema: Joi.Schema | null,
  property: "body" | "query" | "params"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!schema) {
      if (Object.values(req[property]).length > 0) {
        return res.status(400).send()
      }
      return next()
    }
    const { error, value } = schema.validate(req[property], {
      abortEarly: false
    })
    if (error) {
      console.error("request-error", error)
      return res.status(400).send()
    }
    req[property] = value
    next()
  }
}

export default validateRequest
