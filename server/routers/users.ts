import {t} from '../trpc'
import {z} from 'zod'

const userProcedure = t.procedure.input(z.object(
    {
        userId: z.string()
    }
))

export const userRouter = t.router({
    get: userProcedure.query(({input, ctx}) => {
        console.log(`Is user admin ? ${ctx.isAdmin}`)
        return {
            id: input.userId,
            name: 'bob'
        }
    }
    ),
    update: userProcedure.input(z.object({name: z.string()})).mutation(opts => {
        console.log(`Updated user ${opts.input.userId} to have the name ${opts.input.name}`)
        return {
            id: opts.input.userId,
            name: opts.input.name
        }
    })
 })