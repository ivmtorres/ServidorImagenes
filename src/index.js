/*
var http = require("http");

//create a server object:
http
  .createServer(function(req, res) {
    res.write("Hello World!"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
*/
var express = require("express");
var config = require("./server/configure");

var app = express();
var mongoose = require("mongoose");
app.set("port", process.env.PORT || 3300);
app.set("views", __dirname + "/views");
app = config(app);
console.log("iniciando la conexion..."); //*as** */
mongoose.connect(
  "mongodb://ivmtorres:Tv54229115@cluster0-shard-00-00-6yusi.mongodb.net:27017,cluster0-shard-00-01-6yusi.mongodb.net:27017,cluster0-shard-00-02-6yusi.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
);
//mongodb+srv://<username>:<password>@cluster0-6yusi.mongodb.net/test?retryWrites=true&w=majority
//<DBNAME>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin
//"mongodb+srv://cliente:Tv54229115@cluster0-6yusi.mongodb.net/test?retryWrites=true&w=majority"
//"mongodb+srv://cliente:Tv54229115@cluster0-6yusi.mongodb.net/test?ssl=true&authSource=admin"
//mongodb://ivmtorres:Tv54229115@cluster0-shard-00-00-6yusi.mongodb.net:27017,cluster0-shard-00-01-6yusi.mongodb.net:27017,cluster0-shard-00-02-6yusi.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
//mongodb+srv://<username>:<password>@cluster0-6yusi.mongodb.net/test?retryWrites=true&w=majority
//mongodb://ivmtorres:Tv54229115@cluster0-shard-00-00-6yusi.mongodb.net:27017,cluster0-shard-00-01-6yusi.mongodb.net:27017,cluster0-shard-00-02-6yusi.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
mongoose.connection.on("open", function() {
  console.log("Mongoose connectado a la base de datos!"); //ssssdf
});

/*
app.get("/", function(req, res) {
  //54545qweqweqwasdas
  res.send("Hola Mundo"); //daasdasdssssssssssssssssdddxxssss12132asassdfs
}); //4545asdasdssssasasdsfdsdssssasdas
*/
app.listen(app.get("port"), function() {
  console.log("Server up: http://localhost:" + app.get("port"));
});
