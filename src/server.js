const path = require("path");
const express = require("express");
const recordsRouter = require("./routes/records");
const { waitForDb } = require("./db");

const app = express();
const port = Number(process.env.PORT) || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use("/", recordsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(
    `<pre style="font-family:system-ui;padding:1rem;">Error del servidor\n\n${String(
      err.message || err
    )}</pre>`
  );
});

async function main() {
  await waitForDb();
  app.listen(port, "0.0.0.0", () => {
    console.log(`ABM en http://localhost:${port}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
