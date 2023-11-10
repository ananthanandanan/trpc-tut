import {adminProcedure, t} from '../trpc'
import { userRouter } from './users'

export const appRouter = t.router({
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
    }),
    secretData: adminProcedure.query(({ctx}) => {
        console.log(`admin user id is ${ctx.user.id}`)
        return 'secret data'
    }),
    users: userRouter
 })