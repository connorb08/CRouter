import { CResponse } from "./CResponse"
import type {ExecutionContext} from '@cloudflare/workers-types'

export type CloudflareEnv = unknown | undefined
export type CloudflareContext = ExecutionContext | undefined

export type NextHandler = (data?: any) => Response | void
export type CRouterHandler = (req : Request, res : CResponse, {env, ctx, next}: {env?: CloudflareEnv, ctx?: CloudflareContext, next: NextHandler}) => Promise<Response> | Response | void