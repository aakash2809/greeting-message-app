/**
 * @module        config
 * @file          database.config.js
 * @description   Returns a promise that gets resolved when successfully connected 
 *                to MongoDB URL otherwise return error message
 * @requires      {@link http://mongoosejs.com/|mongoose}
 * @requires      logger  is a reference to save logs in log files
 * @author        Aakash Rajak <aakashrajak2809@gmail.com>
 * @since         24/12/2020
----------------------------------------------------------------------------------------------------*/
'use strict';
 
var DEBUG_CONNECTING            = 'Connecting to db server %s...';
var DEBUG_ALREADY_CONNECTED     = 'Already connected to db server %s.';
var DEBUG_ALREADY_CONNECTING    = 'Already connecting to db server %s.';
var DEBUG_CONNECTED             = 'Successfully connected to db server %s.';
var DEBUG_CONNECTION_ERROR      = 'An error has occured while connecting to db server %s.';
var DEBUG_DISCONNECTING         = 'Disconnecting from db server %s...';
var DEBUG_ALREADY_DISCONNECTED  = 'Already disconnected from db server %s.';
var DEBUG_ALREADY_DISCONNECTING = 'Already disconnecting from db server %s.';
var DEBUG_DISCONNECTED          = 'Successfully disconnected from db server %s.';
var DEBUG_DISCONNECTION_ERROR   = 'An error has occured while disconnecting from db server %s.';
 
var blueBird    = require('bluebird');
var debug       = require('debug'); 
var d           = debug('database.config');
class C{}
var url = new C(process.env.MONGODB_URL);
const mongoose = require('mongoose');
const logger   = require('./logger');

require(`dotenv`).config();
 
var isState = function(state){
 return mongoose.connection.readyState === mongoose.Connection.STATES[state];
};
 
/**
* @constructor
*
* @param {string} uri     - Mongoose connection URI.
* @see http://mongoosejs.com/docs/connections.html
* @param {object} options - Mongoose connection options.
*
*/
function MongoDBAdapter(){
    logger.info(url);
   // this.uri     = uri;
    //this.options = options;
    //this.uri = process.env.MONGODB_URL;
   }
    
   /**
   * @description Add connection listeners without adding more than one for each event.
   * This is done to avoid:
   *   'warning: possible EventEmitter memory leak detected. 11 listeners added'
   * More info: https://github.com/joyent/node/issues/5108
   */
   MongoDBAdapter.prototype.addConnectionListener = function(event, cb){
    var listeners = mongoose.connection._events;
    if (!listeners || !listeners[event] || listeners[event].length === 0){
      mongoose.connection.once(event, cb.bind(this));
    }
   };
    
   /**
   * @description Returns a promise that gets resolved when successfully connected to MongoDB URI, or rejected otherwise.
   * @returns {Promise} Returns promise
   */
   MongoDBAdapter.prototype.connect = function(){
    logger.info("connect method");
    return new blueBird(function(resolve, reject){
      if (isState('connected')){
             d(DEBUG_ALREADY_CONNECTED, this.uri);
        return resolve(this.uri);
      }
    
      this.addConnectionListener('error', function(err){
        
        d(DEBUG_CONNECTION_ERROR, this.uri);
        return reject(err);
      });
    
      this.addConnectionListener('open', function(){
        logger.info("open ");
        console.log(DEBUG_CONNECTED, this.uri);
        return resolve(this.uri);
      });
    
      if (isState('connecting')){
        logger.info("if connecting");
        d(DEBUG_ALREADY_CONNECTING, this.uri);
      } else {
        logger.info("else connect");
        d(DEBUG_CONNECTING, this.uri);
        mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
      }
    
    }.bind(this));
   };
    
   /**
   * @description Returns a promise that gets resolved when successfully disconnected from MongoDB URI, or rejected otherwise.
   * @return {Promise} Bluebird promise
*/
MongoDBAdapter.prototype.disconnect = function(){
    return new blueBird(function(resolve, reject){
      if (isState('disconnected') || isState('uninitialized')){
        d(DEBUG_ALREADY_DISCONNECTED, this.uri);
        return resolve(this.uri);
      }
    
      this.addConnectionListener('error', function(err){
        d(DEBUG_DISCONNECTION_ERROR, this.uri);
        return reject(err);
      });
    
      this.addConnectionListener('disconnected', function(){
        d(DEBUG_DISCONNECTED, this.uri);
        return resolve(this.uri);
      });
    
      if (isState('disconnecting')){
        d(DEBUG_ALREADY_DISCONNECTING, this.uri);
      } else {
        d(DEBUG_DISCONNECTING, this.uri);
        mongoose.disconnect();
      }
    
    }.bind(this));
   };
    
   // Export the mongodb connection instance
   module.exports = MongoDBAdapter;
   
   
