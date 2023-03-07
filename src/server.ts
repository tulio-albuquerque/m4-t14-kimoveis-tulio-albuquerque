import app from "./app";
import { AppDataSource } from "./data-source";

import 'dotenv/config'

AppDataSource.initialize().then(() => {
  console.log("Database connected!")
  app.listen(process.env.PORT, async () => {
    // await connectDatabase()
    console.log("Server is running!")
  })
}).catch((err: any) => {
  console.log(err)
})