const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

/*app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));*/


app.use((req,res,next)=>{
    console.log('모든 요청이 실행 됩니다.');
    next();
});

app.get('/',(req,res,next)=>{
    res.send("Hello Express");
    console.log("running Get / reqest")
    res.sendFile(path.join(__dirname,'./index.html'));
    next();
},(req,res)=>{
    throw new Error("Error go to Error processing middleware");
});

app.use((err,req,res,next)=>{
    console.error(err);
    //res.status(200).send(err.message);
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),"에서 대기중");
});
