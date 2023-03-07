import "express-async-errors";
import express, { Application } from "express"
import { errorHandler } from "./error"
import {
  userRouters,
  loginRouters,
  categoriesRouters,
  realEstateRouters,
  schedulesRouters
} from "./routers"

const app: Application = express()
app.use(express.json())

app.use("/users", userRouters)
app.use("/login", loginRouters)
app.use("/categories", categoriesRouters)
app.use("/realEstate", realEstateRouters)
app.use("/schedules", schedulesRouters)

app.use(errorHandler)

export default app