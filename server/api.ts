import express from 'express';
import cors from 'cors';
import { initTRPC } from '@trpc/server'
import {createExpressMiddleware} from '@trpc/server/adapters/express'

const t = initTRPC.create()

const appRouter = t.router({
   sayHi:t.procedure.query(() => {
         return 'hi'
   }),
   logToServer: t.procedure.input(v => {
    if(typeof v === "string") return v

    throw new Error('invalid input')
   }).mutation(req => {
    console.log(
        `client says: ${req.input}`
    )
    return true
   })
})

const app = express();

app.use('/trpc', createExpressMiddleware(
    {router: appRouter}
))


app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
));

app.listen(3000)
