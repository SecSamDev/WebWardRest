const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authController = require('./controllers/auth')
const { postRequestExpress, preRequestExpress } = require('./utils/load-balance')

const cors = require('cors');
const helmet = require('helmet')
const csp = require('helmet-csp')

const index = require('./routes/index');
const api = require('./routes/api');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(cors({
	origin: ["http://localhost:4200"],
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "Origin, X-Requested-With", "Accept", "authorization", "content-type", "responseType"],
	optionsSuccessStatus: 200// some legacy browsers (IE11, various SmartTVs) choke on 204 
}));

if (process.env.NODE_ENV === 'production') {
	//Load in parallel
	/**
	 * For middleware that waits for the response of DB or somthing like that
	 */
	//app.use(parallel([]));
	if (typeof process.env.EXPECT_CT_URL === 'string') {
		//Expect Certificate Transparency
		app.use(require('expect-ct')({
			enforce: true,
			maxAge: (process.env.EXPECT_CT_AGE ? parseInt(process.env.EXPECT_CT_AGE + "") : 30),
			reportUri: process.env.EXPECT_CT_URL
		}))
	}

}

//Security Headers
app.use(helmet())
/*
app.use(csp({
	directives: {
		//If production=> Only HTTPS
		defaultSrc: (process.env.NODE_ENV === 'production' ? ["'self'","https:"] : ["'self'"]),
		imgSrc: ["'self'", 'data:'],
		styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
		reportUri: '/report-violation',
		objectSrc: ["'self'"],
		frameSrc : ["'self'",'data:','blob:'],
		scriptSrc : ["'self'", "'unsafe-inline'"],
		upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? true : false,
		workerSrc: false
	}
}))
*/
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

//Allow caching for Angular resources
//app.use(helmet.noCache())

app.use(bodyParser.json({ type: 'application/json', limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(preRequestExpress);
/*
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, content-type");
	next();
});
*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(authController.loginUser);
app.use('/', index);
app.use('/api', api);
app.use(postRequestExpress)
app.use((req, res, next) => {
	if (res.headersSent === false) {
		next()
	}
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.send(err);
});



module.exports = app;


function parallel(middlewares) {
	return function (req, res, next) {
		async.each(middlewares, function (mw, cb) {
			mw(req, res, cb);
		}, next);
	};
}
function ensureAuthenticated(req, res, next) {
	if (req.user && typeof req.user === 'string')
		return next();
	else
		res.status(401).jsonp({ 'error': 'Unauthorized' })
}

function serieLoad() {

}