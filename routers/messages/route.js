const express = require("express");
const router = express.Router();

const func = require("./controller");

const endPoint = "/messages";

router.route(endPoint).get(func.getMessages);
router.route(endPoint).post(func.postMessage);

// router.route(`${endPoint}/:id`).put(func.helloPut).delete(func.helloDelete);

module.exports = router;
