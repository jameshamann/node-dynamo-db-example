var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "eu-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing Beers into DynamoDB. Please wait.");

var allBeers = JSON.parse(fs.readFileSync('IPA.json', 'utf8'));

allBeers.forEach(function(beer) {
  console.log(beer)

    var params = {
        TableName: "Beers",
        Item: {
            "type": beer.type,
            "name": beer.name,
            "info": beer.info
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add Beer", beer.name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", beer.name);
       }
    });
});
