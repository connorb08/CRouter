import CRouter from "../src/CRouter";

export const router = new CRouter();

router.get("/", (req, res, { next }) => {
  next("nextData response");
});

router.get("/GET", (req, res) => {
  return res.status(200).send("GET response");
});

router.post("POST", (req, res) => {
  return res.send(JSON.stringify({ data: "POST response" }));
});

router.all("/check_nextData", (req, res, { nextData }) => {
  return res.send(nextData);
});

router.get("(.*?)", (req, res, { nextData }) => {
  return res.status(404).send("Not Found");
});

router.all("(.*?)", (req, res, { nextData }) => {
  return res.status(405).send();
});