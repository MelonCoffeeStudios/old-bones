/*
 *  Simple module to make dealing with characters data a bit easier
 *  Below is an example of how to create a new function within the module.
 
exports.hi = function(){
    console.log("Hi")
}

 */
 
 exports.resetChar = function(req, res){
    var user = req.user
    
    // Basic stats init
    user.local.char.name = req.body.char.name;
    user.local.char.race = req.body.char.race;
    user.local.char.Cclass = req.body.char.Cclass;
    user.local.char.lvl = 0;
    user.local.char.xp = 0;
    user.local.char.pos.x = 0;
    user.local.char.pos.y = 0;
    user.local.char.pos.z = 0;
    
    // Create the array for users inv objects
    user.local.char.items.inv = [];
    user.local.char.items.charInv = [];
    user.local.char.items.bank = [];
    
    // Assign each of chars attributes to 1, will be altered later
    user.local.char.attr.body = 1;
    user.local.char.attr.endu = 1;
    user.local.char.attr.fort = 1;
    user.local.char.attr.agil = 1;
    user.local.char.attr.mind = 1;
    user.local.char.attr.sprt = 1;
    user.local.char.attr.soul = 1;
    user.local.char.attr.alrt = 1;
    user.local.char.attr.luck = 1;
    
    user.local.char.stat.hp = 100;
    user.local.char.stat.maxHP = 100;
    user.local.char.stat.mana = 100;
    user.local.char.stat.maxMana = 100;
    user.local.char.stat.buff = [];
    user.local.char.stat.debuff = [];
    
    switch (req.user.local.char.Cclass) {
        case 'Warrior':
            console.log("User created a Warrior character")
            break;
        
        default:
            // code
    }
    
    
    user.save(function(err){
        res.redirect("/profile")
    })
 }