const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const cors = require('cors')
const userRouter = require('./routers/user.routes');
const formsRouter = require('./routers/forms.routes');
const formDataRouter = require('./routers/formdata.routes');

const AppError = require('./utils/app.error');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

app.use(helmet());
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
app.use(cors());
// Access-Control-Allow-Origin *
app.options('*', cors());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/forms', formsRouter);
app.use('/api/v1/formdata', formDataRouter);

app.use('/health', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        statusDesc: 'Api service is up and running.'
    });
});

app.all('*', (req, res, next) => {
    const message = `Can't find ${req.originalUrl} on this server!`;
    next(new AppError(message, 404));
});

app.use(globalErrorHandler);

module.exports = app