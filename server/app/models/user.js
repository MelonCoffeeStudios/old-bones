// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local     : {
        email     : String,
        password  : String,
        account   : {
          username  : String,
          lastLogin : Date
        },   
        char      : {
          name    : String,
          lvl     : Number,
          xp      : Number,
          Cclass  : String,
          race    : String,
          pos     : {
                x   : Number,
                y   : Number,
                z   : Number
          },
          items : {
            inv     : Array,
            charInv : Array,
            bank    : Array
          },
          attr  : {
            body        : Number, //Strength - Influences Melee and HP (A little bit)
            endu        : Number, //Endurance - Influences HP and resistance
            fort        : Number, //Fortitude/Defense - Influences damage received
            agil        : Number, //Agility - ATK and Movement speed
            mind        : Number, //Mind/Intellect - Increases XP, slight magic power increase
            sprt        : Number, //Spirit - Increase power for light spells
            soul        : Number, //Soul - Increases power for light spells
            alrt        : Number, //Alertness - Increases ranged power and range (slightly)
            luck        : Number //Luck - Increases crit hit chance and currency gain
          },
          stat  : {
            hp      : Number,
            maxHP   : Number,
            mana    : Number,
            maxMana : Number,
            buff    : Array,
            debuff  : Array
          }
        }
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
