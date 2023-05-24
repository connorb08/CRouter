import { CResponse } from "./CResponse";
import { CCallback } from "./CTypes";
import { minimatch } from "minimatch";

export interface CRadixTreeNode {
	// path: string
	// index: number
	// http handler
	// http info
	// http method??
	// store handler and whatever info in an array, use node index to find value in array. only use tree for searching...

	handlerQueue: {
		callback: CCallback;
		method: string;
	}[];

	regexMatcher: string;
	edges: {
		[key: string]: CRadixTreeNode;
	};
}

export interface CRadixTreeEdge {
	value: string;
	targetNode: CRadixTreeNode;
}

export class CRadixTree {
	// private NodeQueue: [] = []

	private hasChildren = (node: CRadixTreeNode): boolean => {
		return Object.keys(node.edges).length > 0;
	};
	private root: CRadixTreeNode = {
		handlerQueue: [],
		regexMatcher: "",
		edges: {},
	};

	public insert(path: string, node: CRadixTreeNode) {
		let searchNode: CRadixTreeNode | null = this.root;
		let charactersFound = 0;

		while (true) {
			// Node is an exact match, merge handlerQueue
			if (charactersFound === path.length) {
				for (const handler of node.handlerQueue) {
					searchNode.handlerQueue.push({
						callback: handler.callback,
						method: handler.method,
					});
				}
				return;
			}

			// Node is not an exact match
			if (this.hasChildren(searchNode)) {
				// Look for matching edge

				for (const edge in searchNode.edges) {
					if (path.slice(charactersFound).startsWith(edge)) {
						// Found a matching edge, traverse further and continue loop
						searchNode = searchNode.edges[edge];
						charactersFound += edge.length;
						continue;
					} else if (edge.startsWith(path.slice(charactersFound))) {
						const tempNode = searchNode;
						searchNode = node;
						const lengthDifference = (searchNode.edges[edge.slice(path.length)] = tempNode);
						return;
						// swap the two nodes
						// insert new node is shorter than the current node, replace current node with the new node, and add a new path to the old node
					} else {
						// no matching edge found, insert a new edge here
						searchNode.edges[path.slice(charactersFound)] = node;
						return;
					}
				}
			} else {
				// If there are no edges, we can just add an edge to the node
				searchNode.edges[path.slice(charactersFound)] = node;
				return;
			}
		}
	}

	public async lookup(req: Request, res: CResponse): Promise<void | CResponse> {
		let searchNode: CRadixTreeNode | null = this.root;
		let charactersFound = 0;
		const path = new URL(req.url).pathname;

		console.log(path);
		console.log(searchNode);
		let continueLooping = true;

		for (const handler of searchNode.handlerQueue) {
			if (handler.method === req.method || handler.method === "*") {
				const result = await handler.callback(req, res, () => {});
				if (result) {
					return result;
				}
			}
		}

		// if user is at a node, run the callback functions
		while (this.hasChildren(searchNode) && continueLooping) {
			// console.log("loop1")

			// let response: null
			for (const edge in searchNode.edges) {
				if (minimatch(path.slice(charactersFound), edge)) {
					// glob matches
					console.log("match!");
					// navigate to node --- not necessarily
					// searchNode = searchNode.edges[edge];
					// charactersFound += edge.length;
					for (const handler of searchNode.handlerQueue) {
						if (handler.method === req.method || handler.method === "*") {
							const result = await handler.callback(req, res, () => {});
							if (result) {
								return result;
							}
						}
					}
					// break;
				}
			}
		}
	}
}
