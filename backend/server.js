const mongoose = require('mongoose');
const app = require('./app')
require('dotenv').config();

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'dev';

if (env === 'prod') {
    dbConnection = process.env.DATABASE_PROD;
} else{
    dbConnection = process.env.DATABASE_TEST;
}

mongoose.set('strictQuery', true);
mongoose.connect(dbConnection, { useNewUrlParser: true })
    .then(_ => {
        console.log("Db connection was successfuly")
        console.log(`NODE_ENV: ${env}, DB: ${dbConnection}`)
    })
    .catch(err => console.log(err));

app.listen(port, '0.0.0.0', () => {
    console.log(`App is running on port ${port}`);
});
