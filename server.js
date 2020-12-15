require("dotenv").config();

const express = require("express");
const next = require("next");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const dataCenter = require("./lib/dataCenter");
const models = require("./server/models");
const authRouter = require("./server/routes/auth");
const typeDefs = require("./lib/typeDefs");
const resolvers = require("./lib/resolvers");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
// const app = next({});
const handle = app.getRequestHandler();

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
      let accessToken = null;
      if (req.headers.authorization) {
        const [_, token] = req.headers.authorization.split(" ");
        accessToken = token;
      }

      let error = null,
        user = {};

      if (accessToken && accessToken.length > 5) {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, usr) => {
          error = err;
          user = usr;
        });
      } else {
        error = "Token not found!";
      }

      return {
        models,
        dataCenter: dataCenter(models, { ...user, error }),
      };
    },
  });

  apolloServer.applyMiddleware({ app: server });

  // server.get("/", (req, res) => ssrCache({ req, res }));

  server.use("/auth", authRouter);

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
