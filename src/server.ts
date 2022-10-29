import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRouter from './routes/userRoute'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import productRouter from './routes/productRoute'
import orderRouter from './routes/orderRoute';
import { dashboardRoutes } from './services/dashboard'

dotenv.config();

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter);
dashboardRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
