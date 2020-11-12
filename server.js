require("dotenv").config();

const cacheableResponse = require("cacheable-response");
const express = require("express");
const next = require("next");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { ApolloServer } = require("apollo-server-express");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
// const app = next({});

const models = require("./server/models");
const authRouter = require("./server/routes/auth");

const typeDefs = require("./lib/typeDefs");
const resolvers = require("./lib/resolvers");

const handle = app.getRequestHandler();

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1 hour
  get: async ({ req, res }) => {
    const rawResEnd = res.end;
    const data = await new Promise((resolve) => {
      res.end = (payload) => {
        if (res.statusCode === 200) {
          resolve(payload);
        } else {
          resolve();
        }
      };
      app.render(req, res, req.path, {
        ...req.query,
        ...req.params,
      });
    });
    res.end = rawResEnd;
    return { data };
  },
  send: ({ data, res }) => res.send(data),
});

app.prepare().then(() => {
  const server = express();

  server.use(express.static("public"));
  server.use(morgan("dev"));
  server.use(express.json());
  server.use(cookieParser());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      console.log(req.headers);
      return {
        models,
      };
    },
  });

  apolloServer.applyMiddleware({ app: server });

  server.get("/", (req, res) => ssrCache({ req, res }));

  server.use("/auth", authRouter);

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
