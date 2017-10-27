var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var engine = require("ejs-locals");
var passport = require("passport");
var session = require("express-session");
var database = require("./config/database");
var socket=require('socket.io');
var User = require("./models/user");

var app = express();


app.engine("ejs", engine);
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "tank and spank",
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

database.connect();

var routes = require("./config/routes");
app.use(routes);

var bloodDonor=require('./controller/bloodDonor');
bloodDonor(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});

var port = 1337;
var server=app.listen(port,function(){
    console.log('You are currently listening to port number 1337');
});
//setup socket
var io=socket(server);

//listening to the socket connection attempts made by the browser sockets
io.on('connection',function(socket){   //this socket is the browser's socket
    console.log('Socket connection is made to '+socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);//socket here means the socket from which the message will be broadcasted to all other sockets.
    });
}); 


