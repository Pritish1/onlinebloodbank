module.exports=function(app){
var bodyparser=require('body-parser');
var mongoose=require('mongoose');

//connect to the db
mongoose.connect('mongodb://pritish:pritish@ds119014.mlab.com:19014/databasepritish');

//create a schema
var donorSchema= new mongoose.Schema({
name:String,
weight:Number,
bloodgp:String,
gender:String,
dob:String,
telnum:Number,
state:String
});

//Creating a model , amodel is nothing but a collection
var bloodDonor=mongoose.model('bloodDonor',donorSchema);

var urlencodedParser=bodyparser.urlencoded({extended:false});

app.post("/registerDonor",urlencodedParser,function(req,res){

	var newDonor=new bloodDonor(req.body).save(function(err,data){
		if(err)throw err;
		res.json(data);
	})
});

app.post("/display",urlencodedParser,function(req,res){

	bloodDonor.find({
		bloodgp:req.body.searchgp,
		state:req.body.searchstate

	},function(err,data){
		if(err) throw err;
		res.render('display',{todos:data});	
	});


});


};
