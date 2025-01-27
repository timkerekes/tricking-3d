import db from "../models/index.js";
const battlerooms = await db.sequelize.models.BattleRooms;
const battleroomstats = await db.sequelize.models.BattleRoomStats;
const userscores = await db.sequelize.models.UserScores;
const judgescores = await db.sequelize.models.JudgeScores;

export const makeNewRoom = async (req, res) => {
	let hostid = req.body.data.hostID.uuid;
	const { sessionid, team1, team2, judges, duration } = req?.body?.data;
	let isOpen = true;

	try {
		const sessionSetup = await battlerooms.findOrCreate({
			where: {
				host: hostid,
				sessionid,
				team1,
				team2,
				judges,
				duration,
				isOpen,
			},
		});
		res.json(sessionSetup);
	} catch (err) {
		console.log(err);
		res.send("error");
	}
	/*
    hostid
    sessionid
    team1
    team2
    judges
    isOpen 
    */
	//save battleroom config
};
export const getRooms = async (req, res) => {
	const availableRooms = await battlerooms.findAll();
	res.json(availableRooms);
};
export const getRoombySessionid = async (req, res) => {
	const sessionid = req.params.sessionid;
	try {
		const room = await battlerooms.findOne({
			where: { sessionid },
			include: [
				{ model: db.sequelize.models.BattleRoomStats },
				{ model: db.sequelize.models.JudgeScores },
				{ model: db.sequelize.models.UserScores },
			],
		});
		res.json(room);
	} catch (err) {
		console.log(err);
	}

	//save battleroom config
};
export const updateRoomStats = async (req, res) => {
	const sessionid = req.params.sessionid;
	const {
		team1Score,
		team2Score,
		team1AudienceScore,
		team2AudienceScore,
		winner,
		audienceWinner,
	} = req.body.data;
	try {
		const roomStats = await battleroomstats.findOrCreate({
			where: {
				sessionid,
				team1Score,
				team2Score,
				team1AudienceScore,
				team2AudienceScore,
				winner,
				audienceWinner,
			},
		});

		res.json(roomStats);
	} catch (err) {
		console.log(err);
		res.status(403).json(err);
	}
	//create/update battle stats
	/*
    sessionid
    team1Score
    team2Score
    team1AudienceScore
    team2AudienceScore
    winner
    audienceWinner
    */
};
export const updateRoomScore = async (req, res) => {
	const sessionid = req.params.sessionid;
	const { user, judge, team, score } = req.body.data;
	console.log(user, judge, team, score);
	try {
		if (user) {
			const userScore = await userscores.findOrCreate({
				where: {
					sessionid: sessionid,
					userid: user,
					team: team,
					score: score,
				},
			});
			res.json(userScore);
		}
		if (judge) {
			const judgeScore = await judgescores.findOrCreate({
				where: {
					sessionid: sessionid,
					judge: judge,
					team: team,
					score: score,
				},
			});
			res.json(judgeScore);
		}
	} catch (err) {
		console.log(err);
		res.status(403).json(err);
	}
	//create/update battle stats
	/*
    sessionid
	judge or user
	team
	score
    winner
    audienceWinner
    */
};
export const setRoomInactive = async (req, res) => {
	const sessionid = req.params.sessionid;
	//set battlerooms isOpen to false
	try {
		const room = await battlerooms.findOne({ where: { sessionid } });
		const closedroom = await room.update({ isOpen: false });
		res.json(closedroom);
	} catch (err) {
		console.log(err);
	}
};
