import dotenv from "dotenv"
dotenv.config({ path: ".env" })
import app from "."

const port: number = (process.env.API_PORT as unknown as number) ?? 3000

try {
  app.listen(port)
  console.log(`bank-sy-api is running on port ${port}`)
} catch (error: any) {
  console.log(
    "error",
    `Error occured: ${
      (error as Error).message !== ""
        ? (error as Error).message
        : JSON.stringify(error as Error, null, 2)
    }`
  )
  process.exit()
}
