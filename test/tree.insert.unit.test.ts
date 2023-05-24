import { before, describe } from "node:test";
import { _CRouterTester } from "../src/CRouter";
import { CResponse } from "~/CResponse";

describe("router.all()", () => {

    let router: _CRouterTester;
    let requestsHandled = 0;
    let requestsSent = 0;

    before(() => {

        /**
         * Setup router with testing interaface, this lets private methods be accessed
         */
        router = new _CRouterTester();

        router.all("/", (req: Request, res: CResponse, next) => {
            // This should be merged with root node
        });

        router.all("/foo", (req: Request, res: CResponse, next) => {
            // This should be added to the root node as a child
        });
        
    });

    it("should merge with the root node", () => {
        expect(router._routeTree._root.handlerQueue.length).toEqual(1);
    })

    it("should create a child of the root node", () => {
        expect(router._routeTree._root.children.length).toEqual(1);
    })

    

});