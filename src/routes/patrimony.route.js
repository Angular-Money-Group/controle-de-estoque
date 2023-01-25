const express = require("express");
const patrimonyRouter = express.Router();

patrimonyRouter.get("/patrimony", verifyToken, PatrimonyController.getPatrimony);
patrimonyRouter.post("/patrimony", verifyToken, PatrimonyController.createPatrimony);
patrimonyRouter.put(
  "/patrimony/entry/:id",
  verifyToken,
  PatrimonyController.entryPatrimony
);
patrimonyRouter.put(
  "/patrimony/leave/:id",
  verifyToken,
  PatrimonyController.leavePatrimony
);
patrimonyRouter.delete(
  "/patrimony/:id",
  verifyToken,
  PatrimonyController.deletePatrimony
);

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    return res.status(403).json({ message: "Token de Autenticação Invalido" });
  }
}

module.exports = patrimonyRouter;
