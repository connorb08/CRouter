import { CResponse } from "./CResponse";
import { CCallback } from "./CTypes";
import { minimatch } from "minimatch";


/**
 * @class CRadixTreeNode
 * @description Node class for radix tree
 */
export class CRadixTreeNode {
	// path: string
	// index: number
	// http handler
	// http info
	// http method??
	// store handler and whatever info in an array, use node index to find value in array. only use tree for searching...
	public children: CRadixTreeNode[] = [];
	public pathMatcher: string; // use globs and regex?
	public handlerQueue: {
		callback: CCallback;
		method: string;
	}[];;

	constructor(pathMatcher: string, handlerQueue: { callback: CCallback; method: string }[] = []) {
		this.pathMatcher = pathMatcher;
		this.handlerQueue = handlerQueue;
	}

	public async runQueue(req: Request, res: CResponse) {

		for (let i = 0; i < this.handlerQueue.length; i++) {
			const handler = this.handlerQueue[i];
			if (handler.method === req.method || handler.method === "*") {
				try {
					const result = await handler.callback(req, res, () => {})
					if (result) {
						return result;
					} else {
						continue;
					}
				} catch (error) {
					console.log("error");
					console.error(error);
					// return 500 response??
				}
			}

		}
	}

	public matches(path: string): boolean {
		if (minimatch(path, this.pathMatcher)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Check if node is a leaf
	 * @returns {boolean}
	 */
	public isLeaf(): boolean {
		return this.children.length === 0;
	}

	/**
	 * Adds a child to the node
	 * @param child CRadixTreeNode to be added as a child
	 * @returns {void}
	 */
	public addChild(child: CRadixTreeNode): void {
		this.children.push(child);
	}

	/**
	 * Check if the insertNode should be merged 
	 * @param {CRadixTreeNode} insertNode the node to check if it should be merged
	 * @returns {boolean} true if the pathMatcher is the same
	 */
	public shouldMerge(insertNode: CRadixTreeNode): boolean {
		if (this.pathMatcher === insertNode.pathMatcher) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Merges the handlerQueue of the insertNode into the handlerQueue of this node
	 * @param {CRadixTreeNode} insertNode the node to be merged into this node
	 * @returns {void}
	 */
	public mergeNode(insertNode: CRadixTreeNode): void {
		for (const handler of insertNode.handlerQueue) {
			this.handlerQueue.push(handler);
		}
	}

}

export class CRadixTree {

	private root: CRadixTreeNode

	// Allow private properties to be accessed during unit testing
	constructor(_testRoot?: CRadixTreeNode) {
		this.root = _testRoot || new CRadixTreeNode("/");
	}

	public insert(insertNode: CRadixTreeNode, searchNode: CRadixTreeNode = this.root): unknown {
		// let searchNode: CRadixTreeNode | null = this.root;
		// let charactersFound = 0;

		// insert should only happen once

		// merge nodes if they have the same matcher
		if (searchNode.shouldMerge(insertNode)) {
			searchNode.mergeNode(insertNode);
			return;
		}

		// if the search node is a leaf, and should not be merged, add new node as a child
		if (searchNode.isLeaf()) {
            searchNode.addChild(insertNode);
			return;
        }

		// else :
		// check if seaerch node has children that should be traversed - return recursively if so
		// if they dont, add new node as a child
		for (let i = 0; i < searchNode.children.length; i++) {
			const child = searchNode.children[i];

			// maybe not this??
			if (child.matches(insertNode.pathMatcher)) {
				return this.insert(insertNode, child);
			}
		}

		// add new node as a child
		searchNode.addChild(insertNode);
		return;
		// return
    }

	public lookup(path: string, searchNode: CRadixTreeNode = this.root) {
		throw new Error("lookup: not implemented");
	}

}


/** Class used for testing CRadixTree */
export class _CRadixTreeTester extends CRadixTree {

	/**
	 * @property _root The root node of the test tree
	 */
	public _root: CRadixTreeNode;
	constructor() {
		const _root = new CRadixTreeNode("/");
		super(_root);
		this._root = _root;
	}
}