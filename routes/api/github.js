const express = require("express");
const router = express.Router();
const {Octokit} = require("@octokit/rest");
const axios = require("axios")

const octokit = new Octokit({
    auth:process.env.githubToken,
});
// @route  GET api/github/:username
// @desc   Get user repos from github
// access  Public
router.get("/:username", async (req, res) => {
    const username = req.params.username;
    const repos = await octokit.repos.listForUser({
        username,
        type: "all",
        sort: "pushed",
        direction: "desc",
        per_page: 5,
        page: 1,
    });
    await res.send(repos.data);
});



module.exports = router;
