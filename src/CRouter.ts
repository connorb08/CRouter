import { CResponse } from "./CResponse";
import { CRouterHandler, NextHandler } from "./CTypes";

interface RouteHandler {
    path: string,
    method: string,
    handler: CRouterHandler
}

export default class CRouter {

    private routeArray: RouteHandler[] = [];

    public all = (path: string, handler: CRouterHandler) => {
        this.routeArray.push({path, method: '*', handler});
    }

    public get = (path: string, handler: CRouterHandler) => {
        this.routeArray.push({path, method: 'GET', handler});
    }

    public post = (path: string, handler: CRouterHandler) => {
        this.routeArray.push({path, method: 'POST', handler});
    }

    public handle = (req: Request, cf? : {env?: unknown, ctx?: unknown}) : Response | Promise<Response> => {

        const req_path = new URL(req.url).pathname
        const res = new CResponse();
        const env = cf?.env;
        const ctx = cf?.ctx;

        const matched_nodes = this.routeArray.filter(({path, method}) => {
            if (method.match(req.method) || method === "*") {
                return req_path.match(path);
            }
            else return false;
        })

        for (const node of matched_nodes) {

            var nextData: any;
            const n: NextHandler = (data?: any) => {
                nextData = data;
            }
            const r = node.handler(req, res, {env, ctx, next: n, nextData});
            
            // Return if response is returned, else pass to next handler
            if (r !== undefined) {
                return r;
            }
            else {
                continue;
            }
        }

        throw Error("Error: request fell through router")
    }

}
