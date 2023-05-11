import {router} from './setup'

describe("Router", () => {
  test("GET", async () => {
    const req = new Request("http://localhost/GET");
    const res = await router.handle(req);
    const text = await res.text();
    expect(res.status).toBe(200);
    expect(text).toBe("GET response");
  });

  test("POST", async () => {
    const req = new Request("http://localhost/POST", { method: "POST" });
    const res = await router.handle(req);
    const json = await res.json();
    expect(json).toEqual({ data: "POST response" });
  });

  test("nextData", async () => {
    const req = new Request("http://localhost/check_nextData");
    const res = await router.handle(req);
    const text = await res.text();
    expect(text).toBe("nextData response");
  });

  test("404 Fallthrough", async () => {
    const req = new Request("http://localhost/not_found");
    const res = await router.handle(req);
    expect(res.status).toBe(404);
  });

  test("405 Fallthrough", async () => {
    const req = new Request("http://localhost/", { method: "HEAD" });
    const res = await router.handle(req);
    expect(res.status).toBe(405);
  });
});
