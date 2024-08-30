const mongoose = require('mongoose');
const app = require('./app')

const port = process.env.PORT || 8081;
const env = process.env.NODE_ENV || 'dev';

if (env === 'prod') {
    dbConnection = process.env.DATABASE_PROD;
} else{
    dbConnection = process.env.DATABASE_TEST || "mongodb://127.0.0.1:27017/ecommerce";
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
