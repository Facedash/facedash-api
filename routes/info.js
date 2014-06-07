// module dependencies
var _ = require('underscore');
var util = require('../util/utils');
var graph = require('fbgraph');

var infoRequired = '/me/friends?fields=id,name,birthday,hometown,location,education,gender,interested_in,relationship_status,timezone,languages,locale';
var user = {};

exports.info = function(req, res){
  // we get the User information
  graph.get('/me', function(err, data) {
    // console.log(_.values(data.hometown)[1]);
    user = {
      hometown: _.values(data.hometown)[1],
      location: _.values(data.location)[1],
      timezone: data.timezone,
      locale: data.locale
    }
  });

  infoRequired = req.params.info.split(',');

  res.send(infoRequired);
};

exports.me = function(req, res){
  graph.get('/me', function(err, data) {
    // console.log(_.values(data.hometown)[1]);
    user = {
      hometown: _.values(data.hometown)[1],
      location: _.values(data.location)[1],
      timezone: data.timezone,
      locale: data.locale
    }
  res.send({user: user});
  });
}

//                            .___            
//    ____   ____   ____    __| _/___________ 
//   / ___\_/ __ \ /    \  / __ |/ __ \_  __ \
//  / /_/  >  ___/|   |  \/ /_/ \  ___/|  | \/
//  \___  / \___  >___|  /\____ |\___  >__|   
// /_____/      \/     \/      \/    \/

exports.gender = function(req, res){
  // we get the User information
  graph.get(infoRequired, function(err, data) {
    user.friendsCount = _.pluck(data.data, 'id').length;

    res.send({ 
      data: util.breakDownInfo(data.data, 'gender', user)
    });
  });
};

// .__                        __  .__               
// |  |   ____   ____ _____ _/  |_|__| ____   ____  
// |  |  /  _ \_/ ___\\__  \\   __\  |/  _ \ /    \ 
// |  |_(  <_> )  \___ / __ \|  | |  (  <_> )   |  \
// |____/\____/ \___  >____  /__| |__|\____/|___|  /
//                  \/     \/                    \/

exports.location = function(req, res){
  // console.log('From not Location:',user);
  graph.get(infoRequired, function(err, data) {
    user.friendsCount = _.pluck(data.data, 'id').length;
    // console.log('From Location:',user);
    res.send({
      data: util.compareInfo(data.data, 'location', user)
    });
  });
};

// .__                           __                       
// |  |__   ____   _____   _____/  |_  ______  _  ______  
// |  |  \ /  _ \ /     \_/ __ \   __\/  _ \ \/ \/ /    \ 
// |   Y  (  <_> )  Y Y  \  ___/|  | (  <_> )     /   |  \
// |___|  /\____/|__|_|  /\___  >__|  \____/ \/\_/|___|  /
//      \/             \/     \/                       \/

exports.hometown = function(req, res){
  graph.get(infoRequired, function(err, data) {
    user.friendsCount = _.pluck(data.data, 'id').length;

    res.send({
      data: util.compareInfo(data.data, 'hometown', user)
    });
  });
};

// _____     ____   ____  
// \__  \   / ___\_/ __ \ 
//  / __ \_/ /_/  >  ___/ 
// (____  /\___  / \___  >
//      \//_____/      \/

exports.age = function(req, res){
  graph.get(infoRequired, function(err, data) {
    user.friendsCount = _.pluck(data.data, 'id').length;

    res.send({
      data: util.AverageAge(data.data, user)
    });
  });
};

//                .__          __  .__                     .__    .__        
// _______   ____ |  | _____ _/  |_|__| ____   ____   _____|  |__ |__|_____  
// \_  __ \_/ __ \|  | \__  \\   __\  |/  _ \ /    \ /  ___/  |  \|  \____ \ 
//  |  | \/\  ___/|  |__/ __ \|  | |  (  <_> )   |  \\___ \|   Y  \  |  |_> >
//  |__|    \___  >____(____  /__| |__|\____/|___|  /____  >___|  /__|   __/ 
//              \/          \/                    \/     \/     \/   |__|

exports.relationship = function(req, res){
  graph.get(infoRequired, function(err, data) {
    user.friendsCount = _.pluck(data.data, 'id').length;

    res.send({
      data : util.breakDownInfo(data.data, 'relationship_status', user)
    });
  });
};