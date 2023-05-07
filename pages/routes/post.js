const router = require("express").Router();
const { publicPosts, privatePosts } = require("../db/Post");
const checkAuth = require("../middleware/checkAuth");

router.get("/public", (req, res) => {
    res.json(publicPosts);
});

router.get("/private", checkAuth, (req, res) => {
    res.json(privatePosts);
});

module.exports = router;