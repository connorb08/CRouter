import { CResponse } from "./CResponse"

export type NextHandler = (data?: any) => Response | void
export type CRouterHandler = (req : Request, res : CResponse, {env, ctx, next, nextData}: {env?: unknown, ctx?: unknown, next: NextHandler, nextData?: any}) => Promise<Response> | Response | void