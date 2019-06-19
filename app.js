const express = require('express')
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const reportRoutes = require('./api/routes/reports');
const userRoutes = require('./api/routes/user');
const roleRoutes = require('./api/routes/roles');
const zoneRoutes = require('./api/routes/zones');

//mongoose.Promise = global.Promise;

//mongodb://localhost/conia

//mongodb+srv://conia:conia123@cluster0-mgdsl.mongodb.net/conia?retryWrites=true

mongoose.connect('mongodb://localhost/safeUCA',
    {
        useNewUrlParser:true,
        useCreateIndex: true,
    }).then(()=>{

  console.log("Base de datos conectada");

}).catch((err)=>{

  console.log(err,"No se puedo conectar a la base");

})


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    
    }
    next();
})

app.use('/zones', zoneRoutes);
app.use('/roles', roleRoutes);
app.use('/reports', reportRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
});

module.exports = app;