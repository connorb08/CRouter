import { CResponse } from "./CResponse";
import { CRouterHandler, NextHandler } from "./CTypes";

interface RouteHandler {
    path: string,
    method: string,
    handler: CRouterHandler
}

type HandlerOptions = {};

export default class CRouter {

    private routeArray: RouteHandler[] = [];

    public all = (path: string, handler: CRouterHandler, options?: HandlerOptions) => {
        this.routeArray.push({path, method: '*', handler});
    }

    public get = (path: string, handler: CRouterHandler, options?: HandlerOptions) => {
        this.routeArray.push({path, method: 'GET', handler});
    }

    public post = (path: string, handler: CRouterHandler, options?: HandlerOptions) => {
        this.routeArray.push({path, method: 'POST', handler});
    }

    public delete = (path: string, handler: CRouterHandler, options?: HandlerOptions) => {
        this.routeArray.push({path, method: 'DELETE', handler});
    }

    public handle = async (req: Request, cf? : {env?: unknown, ctx?: unknown}) : Promise<Response> => {

        const req_path = new URL(req.url).pathname;
        const res = new CResponse();
        const env = cf?.env;
        const ctx = cf?.ctx;

        const matched_nodes = this.routeArray.filter(({path, method}) => {
            if (method.match(req.method) || method === "*") {
                return req_path.match(path);
            }
            else return false;
        })

        // Local storage passed by next()
        var local: any[] = [];
        for (const node of matched_nodes) {

            const next: NextHandler = (data?: any) => {
                local.unshift(data);
            }
            const r = await node.handler(req, res, {env, ctx, next, local});
            
            // Return if response is returned, else pass to next handler
            if (r instanceof CResponse) {
                return r.send();
            }
            else if (r instanceof Response) {
                return r;
            }
            else {
                continue;
            }
        }

        throw Error("Error: request fell through router")
    }

}
