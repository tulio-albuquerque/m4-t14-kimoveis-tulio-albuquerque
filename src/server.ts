import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  console.log("Database connected!")
  app.listen(3000, async () => {
    // await connectDatabase()
    console.log("Server is running!")
  })
}).catch((err: any) => {
  console.log(err)
})