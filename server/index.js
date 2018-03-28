'user strict'

//first we import our dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require("passport");
var morgan = require("morgan");
var mongoose = require("mongoose");
var uuid = require('uuid/v1');


var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

// Models
var User   = require('../models/users');
var Poll = require('../models/polls');
var Vote = require('../models/votes');

//and create our instances
var app = express();
var router = express.Router();
var apiRoutes = express.Router();

/* CONFIG */
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.PORT || 3001;
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret);

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// set static serve path to public
app.use(express.static(path.join(__dirname, '../build')));

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Accces-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 
    'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Access-Control-Expose-Headers', 'Authorizaton')

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');

  if(req.method == 'OPTIONS'){
    res.sendStatus(200)
  }
  
  return next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res){
  res.json({ message: 'API Initialized!' });
});

// fake route to set a user in empty DB
router.get('/setuser', function(req, res){
  var newUser = new User({
    email: 'adam@gronda.eu',
    password: 'admin',
    payload: 'user',
    _id: new mongoose.Types.ObjectId(),
  })

  newUser.save(function(err) {
    if(err) throw err;

    console.log('User saved succesfully');
    res.json({ status: 'ok' });
  })
});

//now we can set the route path & initialize the API
router.get('/allusers', function(req, res){
  User.find({}, function(err, users){
    res.json(users);
  })
});

// REGISTER ROUTE
router.post('/register', function(req, res){
  // user findOne -> if email exists, res error: email exists
  const newID = new mongoose.Types.ObjectId();
  var newUser = new User({
    email: req.body.email,
    password: req.body.password,
    payload: newID,
    _id: newID,
  })

  newUser.save(function(err) {
    if(err) throw err;

    const payload = {
      payload: newID 
    };
    var token = jwt.sign(payload, app.get('superSecret'));

    console.log('User saved succesfully');
    res.json({
      status: 'ok',
      token: token
    });
  })
});

// LOGIN ROUTE
router.post('/login', function(req, res) {
  User.findOne({
      username: req.body.username
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          const payload = {
            payload: user.payload 
          };
          var token = jwt.sign(payload, app.get('superSecret'));

          // return the information including token as JSON
          res.json({
            success: true,
            token: token
          });
        }   
      }
  });
});

apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['authorization'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

/** User related calls **/

apiRoutes.get('/personal', function(req, res) {
  const uID = req.decoded.payload;

  User.findOne({
    _id: uID
  }, function(err, user) {
    if(err) throw err;

    user.password = null;
    // get vote data from user_votes table
    res.json({
      status: 'ok',
      data: user
    })
  })
})

/** POLL related routes **/

// GET all polls route (needs auth)

apiRoutes.get('/polls', function(req, res) {
  Poll.find({}, function(err, polls){
    res.json({
      status: 'ok',
      data: polls
    });
  })
})

// CREATE a new poll (needs auth)

apiRoutes.post('/create/poll', function(req, res){
  var userID = req.decoded.payload;

  if(!userID) {
    return res.json({
      status: 'error',
      message: 'Sorry, but user not found in DB'
    })
  }else{
    User.findOne({
      _id: userID
    }, function(err, user) {
      if(err) throw err;

      if(user){
        var publicUrl = req.body.question.substr(0, 10) + '_' + uuid().substr(0, 7);
        publicUrl = publicUrl.replace(/ /g, '_');

        var newPoll = new Poll({
          question: req.body.question,
          yesCount: 0,
          noCount: 0,
          public_url: publicUrl,
          userId: user._id
        })

        newPoll.save(function(err) {
          if(err) throw err;

          res.json({
            status: 'ok',
            data: newPoll
          })
        })
      }
    })
  }
})

apiRoutes.get('/poll/:id', function(req, res) {
  var publicUrl = req.params.id;
  var userId = req.decoded.payload;

  function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}

  Poll.findOne({
    public_url: publicUrl
  }, function(err, poll) {
    if(err) throw err;

    if(poll){
      // get yescounts
      Vote.count({
        pollId: poll._id,
        vote: true
      }, function(err, yesCount) {
        if(err) throw err;

        // get nocounts
        Vote.count({
          pollId: poll._id,
          vote: false
        }, function(err, noCount) {
          if(err) throw err;

          var resData = {
            yesCount: yesCount,
            noCount: noCount,
            _id: poll._id,
            question: poll.question,
            public_url: poll.public_url,
            userId: poll.userId
          }

          Vote.count({
            pollId: poll._id,
            userId: userId
          }, function(err, userVoteCount) {
            if(err) throw err;

            if(userVoteCount > 0){
              resData.hasVoted = true;
            }else {
              resData.hasVoted = false;
            }

            res.json({
              status: 'ok',
              data: resData
            })
          })

        })
      })
    }
  })
})

// delete a poll by id
apiRoutes.delete('/poll/:id', function(req, res) {
  var publicUrl = req.params.id;

  Poll.deleteOne({
    public_url: publicUrl
  }, function(err) {
    if (err) throw err;

    res.json({
      status: 'ok',
      message: 'poll deleted'
    })
  })
})

apiRoutes.post('/vote/:id', function(req, res) {
  var userId = req.decoded.payload;
  var pollId = req.params.id;
  var vote = req.body.vote;

  var newVote = new Vote({
    userId: userId,
    pollId: pollId,
    vote: vote
  });

  newVote.save(function(err) {
    if(err) throw err;

    res.json({
      status: 'ok',
      message: 'succesfull vote'
    })
  })
})

// REACT
router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//Use our router configuration when we call /api
app.use('/api', apiRoutes);

//Use our router configuration when we call normal stuff
app.use('/', router);

//starts the server and listens for requests
app.listen(port, function(){
  console.log('api running on port '+ port);
});
