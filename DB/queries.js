const { db } = require("./db");

async function getTeams() {
  try {
    const [teams] = await db.query("SELECT * FROM meetings_management.teams;");
    return teams;
  } catch (err) {
    return res.status(500).send("an unexpected error, please try again");
  }
}

async function getMeetingsByTeamId(teamId) {
  try {
    const [meetings] = await db.query(
      "SELECT * FROM meetings_management.meetings WHERE teamId = ?",
      [teamId]
    );
    return meetings;
  } catch (err) {
    return res.status(500).send("an unexpected error, please try again");
  }
}

async function addMeeting(teamId, startAt, endAt, description, room) {
  try {
    const [{ insertId }] = await db.query(
      "INSERT INTO meetings (teamId, startAt, endAt, description, room) VALUES (?, ?, ?, ?, ?)",
      [teamId, startAt, endAt, description, room]
    );
    return insertId;
  } catch (err) {
    return res.status(500).send("an unexpected error, please try again");
  }
}

module.exports = {
  getTeams,
  getMeetingsByTeamId,
  addMeeting,
};
