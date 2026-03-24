const mysql = require('mysql');
const config = require('./config.js');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

// Use a connection pool instead of a single connection
// This handles reconnections automatically and is more stable
const pool = mysql.createPool({
    ...config,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Health check
app.get('/api/health', (req, res) => {
    res.send({ status: 'OK', message: 'Server is running' });
});

app.post('/api/addInterest', (req, res) => {
	const { place, activity, time, userID } = req.body;
	const sql = `INSERT INTO user_activity (location, action, time, user_settings_user_id) VALUES (?, ?, ?, ?)`;
	const data = [place, activity, time, userID];

	pool.query(sql, data, (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send({ express: results });
	});
});

app.get('/api/getUsersArray', (req, res) => {
	const sql = `SELECT * FROM chat c, user_settings us WHERE us.user_id = c.user_settings_user_id`;

	pool.query(sql, (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send({ express: results });
	});
});

app.post('/api/contactUs', (req, res) => {
	const { name, body, email, userID } = req.body;
	const today = new Date();
	const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

	const sql = `INSERT INTO contact_us (name, body, user_id, email, date) VALUES (?, ?, ?, ?, ?)`;
	pool.query(sql, [name, body, userID, email, date], (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send({ express: results });
	});
});

app.post('/api/addChat', (req, res) => {
	const { post, ran, userID } = req.body;
	const sql = `INSERT INTO chat (content, user_to, user_settings_user_id) VALUES (?, ?, ?)`;
	const data = [ran, post, userID];

	pool.query(sql, data, (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send({ express: results });
	});
});

app.post('/api/getUserSettings', (req, res) => {
	const sql = `SELECT * from user_settings WHERE user_id=?`;

	pool.query(sql, [req.body.userID], (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send(results);
	});
});

app.post('/api/updateUserSettings', (req, res) => {
    const { fieldToChange, userID, newVal } = req.body;
	const sql = `
		INSERT INTO user_settings (user_id, ??)
		VALUES (?, ?)
		ON DUPLICATE KEY UPDATE
		?? = ?`;

	const data = [fieldToChange, userID, newVal, fieldToChange, newVal];

	pool.query(sql, data, (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send({ express: results });
	});
});

app.post('/api/getUserList', (req, res) => {
	const sql = `SELECT * from user_settings`;

	pool.query(sql, (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send(results);
	});
});

app.post('/api/getFriendList', (req, res) => {
	const sql = `SELECT addressee from friend_list WHERE requester=?`;

	pool.query(sql, [req.body.userID], (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send(results.map(item => item.addressee));
	});
});

app.post('/api/getBlockList', (req, res) => {
	const sql = `SELECT addressee from block_list WHERE requester=?`;

	pool.query(sql, [req.body.userID], (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send(results.map(item => item.addressee));
	});
});

app.post('/api/addUser', (req, res) => {
	const { action, userID, addressee } = req.body;
    const table = `${action}_list`;
	const sql = `INSERT INTO ?? (requester, addressee) VALUES (?, ?)`;

	pool.query(sql, [table, userID, addressee], (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send(results);
	});
});

app.post('/api/removeUser', (req, res) => {
	const { action, userID, addressee } = req.body;
    const table = `${action}_list`;
	const sql = `DELETE FROM ?? WHERE requester=? AND addressee=?`;

	pool.query(sql, [table, userID, addressee], (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send(results);
	});
});

app.post('/api/getUserGoals', (req, res) => {
	const sql = `SELECT * from goal_tracking WHERE user_settings_user_id=?`;

	pool.query(sql, [req.body.userID], (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send(results);
	});
});

app.post('/api/updateUserGoals', (req, res) => {
	const today = new Date();
	const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
	const sql = `UPDATE goal_tracking SET completed=1, date=? WHERE id=?`;

	pool.query(sql, [date, req.body.goalID], (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send({ express: results });
	});
});

app.post('/api/addUserGoals', (req, res) => {
    const { id, goal, userID } = req.body;
	const sql = `
		INSERT into goal_tracking (id, goal, user_settings_user_id) 
		VALUES (?, ?, ?) 
		ON DUPLICATE KEY UPDATE goal = ?`;

	pool.query(sql, [id, goal, userID, goal], (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send({ express: results });
	});
});

app.post('/api/searchActivity', (req, res) => {
	const { place, activity, time } = req.body;
	let sql = `SELECT * FROM user_activity ua, user_settings us WHERE us.user_id = ua.user_settings_user_id`;
	const data = [];

	if (place) {
		sql += ` AND ua.location = ?`;
		data.push(place);
	}
	if (activity) {
		sql += ` AND ua.action = ?`;
		data.push(activity);
	}
	if (time) {
		sql += ` AND ua.time = ?`;
		data.push(time);
	}

	pool.query(sql, data, (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send({ express: results });
	});
});

app.post('/api/addPeople', (req, res) => {
	const { final, userID } = req.body;
	const sql = `INSERT INTO user_similar (gr, user_settings_user_id) VALUES (?, ?)`;
	const data = [final, userID];

	pool.query(sql, data, (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send({ express: results });
	});
});

app.post('/api/searchPeople', (req, res) => {
	const { final } = req.body;
	const sql = `SELECT * FROM user_settings us, user_similar ua 
	WHERE us.user_id = ua.user_settings_user_id AND ua.gr = ?`;
	const data = [final];

	pool.query(sql, data, (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send({ express: results });
	});
});

app.post('/api/getUsersCalendar', (req, res) => {
	const sql = `SELECT * from user_calendar WHERE user_settings_user_id=?`;

	pool.query(sql, [req.body.userID], (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send(results);
	});
});

app.post('/api/addCalendar', (req, res) => {
	const { eventName, startTime, endTime, userID } = req.body;
	const sql = `INSERT INTO user_calendar (event, start, end, user_id, user_settings_user_id) VALUES (?, ?, ?, ?, ?)`;
	const data = [eventName, startTime, endTime, 0, userID];

	pool.query(sql, data, (error, results) => {
		if (error) {
			console.error(error.message);
            return res.status(500).send({ error: error.message });
		}
		res.send({ express: results });
	});
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
