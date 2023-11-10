import { initTRPC, inferAsyncReturnType, TRPCError } from "@trpc/server";
import { createContext } from "./context";

type Context = inferAsyncReturnType<typeof createContext>;
export const t = initTRPC.context<Context>().create();

//MiddleWare

const isAdminMiddleWare = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to do this",
    });
  return next({
    ctx: {
      user: { id: 1 },
    },
  });
});

export const adminProcedure = t.procedure.use(isAdminMiddleWare)