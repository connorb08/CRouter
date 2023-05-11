import { CResponse } from "./CResponse"

export type NextHandler = (data?: any) => Response | void
export type CRouterHandler = (req : Request, res : CResponse, {env, ctx, next, local}: {env?: unknown, ctx?: unknown, next: NextHandler, local?: any[]}) => CResponse | Response | Promise<CResponse> | Promise<Response> | void