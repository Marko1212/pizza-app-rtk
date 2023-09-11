const jwt = require('jsonwebtoken');
const jsonServer = require('json-server');
const JWT_SECRET_KEY =
	require('./node_modules/json-server-auth/dist/constants').JWT_SECRET_KEY;
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const rules = auth.rewriter({
	// Permission rules
	users: 600
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.get('/user/profile', auth, (req, res) => {
	const token = req.header('Authorization')
		? req.header('Authorization').replace('Bearer ', '')
		: null;
	if (token) {
		try {
			const data = jwt.verify(token, JWT_SECRET_KEY);
			const { db } = req.app;
			let user = db.get('users').find({ email: data.email }).value();
			res.json(user);
		} catch (error) {
			res.json({ error: error });
		}
	} else {
		res.json({ error: { name: 'User not authorized' } });
	}
});

// /!\ Bind the router db to the app
server.db = router.db;

// You must apply the auth middleware before the router
server.use(rules);
server.use(auth);
server.use(router);
server.listen(3000);
