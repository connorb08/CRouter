import { CResponse } from "./CResponse"



export type CMiddleware = (req: Request, res: CResponse, next: (err?: unknown) => void) => CResponse | Promise<CResponse> | void | Promise<void>
export type CBasicHandler = (req: Request, res: CResponse) => CResponse | Promise<CResponse> | void | Promise<void>

export type CCallback = CMiddleware | CBasicHandler

export type RoutePathOptions = string //| RegExp
export type RoutePath = RoutePathOptions | RoutePathOptions[] // Default "/"


// type CMiddlewareFunction = CMiddleware | CErrorMiddleware

// type CErrorMiddleware = (error, req, res, next) => Response | Promise<Response> | void | Promise<void>


export interface CApp {

    // Properties
    router: CRouterInterface

    use(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    use(callback: CCallback, ...callbacks: CCallback[]): void // defaults to "/"
    all(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    //individual calls
    checkout(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    copy(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    delete(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    get(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    head(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    lock(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    merge(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    mkactivity(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    mkcol(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    move(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    'm-search': (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) => void
    notify(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    options(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    patch(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    post(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    purge(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    put(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    report(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    search(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    subscribe(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    trace(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    unlock(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    unsubscribe(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void
    

    // Express.js example
    // route('/events')
    //     .all((req, res, next) => {
    //         // runs for all HTTP verbs first
    //         // think of it as route specific middleware!
    //     })
    //     .get((req, res, next) => {
    //         res.json({})
    //     })
    //     .post((req, res, next) => {
    //         // maybe add a new event...
    //     })

    // Needs implementation
    route(path: RoutePath): this // express js example above
    param(name: string, callback: CCallback): void // set url params??
    set(name: string, value: unknown): void     // used to set app locals
    listen(): void//use service worker api, addEventListener(fetch) event.respond with router.route(event.request)??



}

// dont use query params in route matching
export abstract class CRouterInterface {

    public all (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {}
    public use (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {}
// use(callback: CCallback, ...callbacks: CCallback[]): void // defaults to "/"

    public checkout (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {}
    public copy (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public delete (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public get (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public head (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public lock (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public merge (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public mkactivity (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public mkcol (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public move (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public notify (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public options (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public patch (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public post (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public purge (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public put (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public report (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public search (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public subscribe (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public trace (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public unlock (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public unsubscribe (path: RoutePath, callback: CCallback, ...callbacks: CCallback[]) : void  {}
    public async route(req: Request): Promise<Response> { return new Response() }


}