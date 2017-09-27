var express = require('express');
var app = express();
var request = require('request');
var firebase = require('firebase');
var cors = require('cors')

app.use(cors())
require('firebase/database');

var firebase_cred = {
    apiKey: "AIzaSyAyscBTLhOFfz3rWvxCcg9Woyj5zJAKy9U",
    authDomain: "ers-dispatch.firebaseapp.com",
    databaseURL: "https://ers-dispatch.firebaseio.com",
    projectId: "ers-dispatch",
    storageBucket: "ers-dispatch.appspot.com",
    messagingSenderId: "412226656783"
}
firebase.initializeApp(firebase_cred);

firebase.auth().signInWithEmailAndPassword('emergency.response.solutions1@gmail.com', 'password')
.catch(function(error) {
  console.log(error);
});


app.set('port', process.env.PORT || 5000);

app.get('/api/', (req, res) => {
  if (req.query.code){
    var code = req.query.code;
    firebase.database().ref(`/ersDispatches/${code}`).once('value')
    .then(function(snapshot){
      if(snapshot) {
        console.log(snapshot.val());
        res.send(JSON.stringify(snapshot.val()));
      }
    })
    .catch(function(err){
      res.send(err);
    });
  } else {
    res.send('Please include key');
  }
});

app.listen(app.get('port'), function() {
  console.log('Running on port', app.get('port'));
});
