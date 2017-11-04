var express = require('express');
var app = express();
var request = require('request');
var admin = require('firebase-admin');
var cors = require('cors')

app.use(cors())

var serviceAccount = require("./key/ers-dispatch-firebase-adminsdk-08k8q-3c9e3d13f9.json");

var firebase_cred = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ers-dispatch.firebaseio.com",
}
admin.initializeApp(firebase_cred);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
  console.log('Running on port', app.get('port'));
});

app.get('/api/', (req, res) => {
  if (req.query.code){
    var code = req.query.code;
    admin.database().ref(`/ersDispatches/${code}`).once('value')
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
