import { CResponse } from "./CResponse";
import { CCallback, CRouterInterface, RoutePath } from "./CTypes";
import { CRadixTree, CRadixTreeNode } from "./RadixTree";

export default class CRouter implements CRouterInterface {
	private routeTree = new CRadixTree();
	constructor() {}

	public async route(req: Request): Promise<Response> {
		try {
			const res = new CResponse();
			const result = await this.routeTree.lookup(req, res);

			if (result) {
				return result.getResponseObject();
			} else {
				console.log("No route found");
				throw new Error("No route found");
			}
		} catch (error) {
			console.log(error);
			if (error instanceof Error && error.message === "error: request fell through router") {
				return new Response("Not Found", { status: 404 });
			}
			throw error;
		}

		// console.log(res);
	}

	public all(path: RoutePath, callback: CCallback, ...callbacks: CCallback[]): void {
		const p = path.toString();

		if (path instanceof Array) {
			for (const p of path) {
				this.routeTree.insert(p, {
					regexMatcher: p,
					handlerQueue: [{ method: "*", callback }],
					isLeaf: true,
					edges: {},
				} as CRadixTreeNode);

				for (const cb of callbacks) {
					this.routeTree.insert(p, {
						regexMatcher: p,
						handlerQueue: [{ method: "*", callback: cb }],
						isLeaf: false,
						edges: {},
					} as CRadixTreeNode);
				}
			}
		} else {
			this.routeTree.insert(p, {
				regexMatcher: p,
				handlerQueue: [{ method: "*", callback }],
				isLeaf: true,
				edges: {},
			} as CRadixTreeNode);

			for (const cb of callbacks) {
				this.routeTree.insert(p, {
					regexMatcher: p,
					handlerQueue: [{ method: "*", callback: cb }],
					isLeaf: false,
					edges: {},
				} as CRadixTreeNode);
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
