// import CRouter from "./CRouter";
// export const router = new CRouter();
// export default router;

import { CResponse } from "./CResponse";
import CRouter from "./CRouter";

const router = new CRouter();

// Middleware to capture the request information, incrementing the run count
router.all("/", (req: Request, res: CResponse, next) => {
	return next();
});

// Have two handlers attached to the same path, client should get response from second handler
router.all("/foo", (req: Request, res: CResponse, next) => {
	return next();
});

router.all("/foo", (req: Request, res: CResponse) => {
	return res.send("response from foo 2");
});

// This should not be called, if it is, return a 500 code and print error to console
// router.all("/error_test", (req: Request, res: CResponse, next) => {
// 	// next()
// 	return res.send("return a response after calling next()");
// });
router.all("/error_test", (req: Request, res: CResponse) => {
	return res.send("this response never makes it to the client :(");
});


