import { before, describe } from "node:test";
import CRouter from "../src/CRouter";
import { nextTick } from "node:process";
import { CResponse } from "~/CResponse";

describe("router.all()", () => {
	
	let router: CRouter;
	let requestsHandled = 0;
	let requestsSent = 0;


	// Set up the router
	beforeAll(() => {
		router = new CRouter();

		// Middleware to capture the request information, incrementing the run count
		router.all("*", (req: Request, res: CResponse, next) => {
            requestsHandled += 1;
			return next();
        });

		// Have two handlers attached to the same path, client should get response from second handler
		// router.all("/foo", (req: Request, res: CResponse, next) => {
		// 	return next();
		// });

		router.all("/foo", (req: Request, res: CResponse) => {
			return res.send("response from foo 2");
		});

		// This should not be called, if it is, return a 500 code and print error to console
		router.all("/error_test", (req: Request, res: CResponse, next) => {
			next()
			return res.send("return a response after calling next()");
		});
		router.all("/error_test", (req: Request, res: CResponse) => {
			return res.send("this response never makes it to the client :(");
		});

	});

	it("displays the response from the second handler in the queue", async () => {
		const req = new Request("http://localhost/foo");
		requestsSent += 1;
		const res = await router.route(req);
		const text = await res.text();
		expect(text).toEqual("response from foo 2");
	});


	it("should throw an error", async () => {
		
		const req = new Request("http://localhost/error_test");
		requestsSent += 1;
		const res = await router.route(req);
		expect(res.status).toEqual(500)
		
	})

	it("should return a 404 on not found", async () => {
		const req = new Request("http://localhost/not_found");
		requestsSent += 1;
		const res = await router.route(req);
		expect(res.status).toEqual(404)
	})

	// it("should display the correct run count", async () => {
	
	// 	const req = new Request("http://localhost/");
	// 	requestsSent += 1;
	// 	const res = await router.route(req);
	// 	expect(requestsHandled).toEqual(requestsSent)
	
	// })


});
