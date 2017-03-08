var express = require('express');
var app = express();
app.use('/static', express.static(__dirname+'/build/static/'));

app.get('/',function(req,res){
    res.sendFile('build/index.html', {root: __dirname })
});
app.get('/favicon.ico',function(req,res){
    res.sendFile('build/favicon.ico', {root: __dirname })
});
var port = 
app.listen(process.env.PORT || 3000);