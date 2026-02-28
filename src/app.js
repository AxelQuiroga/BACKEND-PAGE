import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import contactRoutes from "./routes/contact.routes.js"
import { errorHandler } from "./middlewares/errorHandler.js"
dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/contact",contactRoutes)
app.use(errorHandler);
export default app