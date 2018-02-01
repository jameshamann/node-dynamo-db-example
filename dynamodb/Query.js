var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for IPA Beers.");

var params = {
    TableName : "Beers",
    KeyConditionExpression: "#type = :type",
    ExpressionAttributeNames:{
        "#type": "type"
    },
    ExpressionAttributeValues: {
        ":type": "IPA"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.type + ": " + item.name + ' ' + item.info['abv'] + '%');
        });
    }
});
