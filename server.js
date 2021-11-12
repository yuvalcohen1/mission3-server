const express = require("express");
const cors = require("cors");
const { getTeams, getMeetingsByTeamId, addMeeting } = require("./DB/queries");
require("dotenv").config();
require("./DB/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/teams", async (req, res) => {
  try {
    const teams = await getTeams();
    res.send(teams);
  } catch (err) {
    return res.status(500).send("an unexpected error, please try again");
  }
});

app.get("/api/meetings/:id", async (req, res) => {
  const { id } = req.params;
  const idAsNumber = Number(id);

  try {
    const meetings = await getMeetingsByTeamId(idAsNumber);
    res.send(meetings);
  } catch (err) {
    return res.status(500).send("an unexpected error, please try again");
  }
});

app.post("/api/add-meeting", async (req, res) => {
  const { teamId, startAt, endAt, description, room } = req.body;

  try {
    const id = await addMeeting(teamId, startAt, endAt, description, room);
    res.send({ id });
  } catch (err) {
    return res.status(500).send("an unexpected error, please try again");
  }
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`server is up at ${PORT}`);
});
