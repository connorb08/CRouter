import { CResponse } from "./CResponse";
import { CCallback, CRouterInterface, RoutePath } from "./CTypes";
import { CRadixTree, CRadixTreeNode, _CRadixTreeTester } from "./RadixTree";


/**
 * @class CRouter
 * @description Router class for handling requests
 * @implements CRouterInterface
 * 
 */
export default class CRouter implements CRouterInterface {
	
	/**
	 * @property routeTree
	 */
	protected routeTree: CRadixTree;

	/**
	 * 
	 * @param _testTree Optional parameter for testing purposes
	 */
	constructor(_testTree?: _CRadixTreeTester) {
		this.routeTree = _testTree || new CRadixTree();
	}

	public async route(req: Request): Promise<Response> {
		throw new Error("Method not implemented.");
	}

	/**
	 * 
	 * @param path String or array of strings to be passed to the radix tree
	 * @param callback Callback function to be called when the path is matched
	 * @param callbacks Additonal callbacks to be called when the path is matched
	 * @returns void
	 * 
	 * @description Adds a route (or series of routes) to the router that match any HTTP method
	 */
	public all(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		const p = path.toString();

		if (path instanceof Array) {
			for (const p of path) {
				this.routeTree.insert(new CRadixTreeNode(p, [{ method: "*", callback }]))
				for (const cb of callbacks) {
					this.routeTree.insert(new CRadixTreeNode(p, [{ method: "*", callback: cb }]))
				}
			}
		} else {
			this.routeTree.insert(new CRadixTreeNode(p, [{ method: "*", callback }]))
				for (const cb of callbacks) {
					this.routeTree.insert(new CRadixTreeNode(p, [{ method: "*", callback: cb }]))
				}
		}
		return;
	}

	public use(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public checkout(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public copy(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public delete(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public get(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public head(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public lock(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public merge(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public mkactivity(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public mkcol(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public move(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public notify(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public options(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public patch(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public post(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public purge(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public put(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public report(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public search(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public subscribe(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public trace(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public unlock(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
	public unsubscribe(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		throw new Error("Method not implemented.");
	}
}



/** Class for testing the CRouter class */
export class _CRouterTester extends CRouter {

	/**
	 * @property _routeTree The radix tree used by the router for testing purposes
	 */
	public _routeTree: _CRadixTreeTester;
	
	/**
	 * Should only be used for testing
	 */
	constructor() {
		const _routeTree = new _CRadixTreeTester();
		super(_routeTree);
		this._routeTree = _routeTree;
	}

}