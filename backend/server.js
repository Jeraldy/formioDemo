const mongoose = require('mongoose');
const app = require('./app')

const port = process.env.PORT || 8081;
const env = process.env.NODE_ENV || 'dev';

let dbConnection = "mongodb+srv://root:trojan100@nunua.j5u3vdw.mongodb.net/ecommerce?retryWrites=true&w=majority";
//process.env.DATABASE_DEV;
//let dbConnection = "mongodb://127.0.0.1:27017/ecommerce"
if (env === 'prod') {
    dbConnection = process.env.DATABASE_PROD;
} else if (env === 'test') {
    dbConnection = process.env.DATABASE_TEST;
}

console.log({ dbConnection })

mongoose.connect(dbConnection, { useNewUrlParser: true })
    .then(_ => {
        console.log("Db connection was successfuly")
        console.log(`NODE_ENV: ${env}, DB: ${dbConnection}`)
    })
    .catch(err => console.log(err));

app.listen(port, '0.0.0.0', () => {
    console.log(`App is running on port ${port}`);
});
