module.exports = function(app, passport, game, io, mongo, ObjectID){
    
    var assert = require('assert');
    var url = 'mongodb://localhost:27017/passport';
    // var ObjectID = require('mongodb').ObjectID;





io.on('connection', function(socket){
    console.log("User Connected!")
    
    socket.on("init", function(id) {
        console.log("init event called! USer: "+ id)
        try{
            var tmp = getCharInfo(id, socket)
        }
        catch (err) {
            socket.emit("error", "User entered an incorrect ID" + "\n" + err)
        }
    })
    
    socket.on("new pos", function(newPos) {
        try {
            console.log("Player ID: " + newPos.id)
            console.log("  New x pos: " + newPos.x.toFixed(2) + ", New y pos: " + newPos.y.toFixed(2)) 
            var ping = (Date.now() - newPos.ping) / 100;
            console.log("  Ping is: " + ping + "ms")
            
            mongo.connect(url, function(err, db){
                assert.equal(err);
                db.collection("users").updateOne({
                    _id :   ObjectID(newPos.id)
                },
                {
                    $set:   {
                        "local.char.pos.x"  :   newPos.x,
                        "local.char.pos.y"  :   newPos.y
                    }
                }, function(err, results){
                    if(err){
                        console.log(err)
                        db.close()
                    }else {
                        console.log("Inserted!")
                        db.close()
                        
                    }
                })
            })
        }
        catch (err){ // End of Try
            throw (err)
        }
        
    })
    
    socket.on('disconnect', function(socket){
      console.log("User Disconnected")  
    })
})

function getCharInfo(id, sock){
    var url = 'mongodb://localhost:27017/passport'
    var tmp;
    mongo.connect(url, function(err, db){
        db.collection("users").find({_id  :   ObjectID(id)},function(err, doc){
            doc.toArray(function(err, file){
                console.log(file)
                sock.emit("return-init", file[0].local.char)
                return file;
            })
        })
    })
}


}