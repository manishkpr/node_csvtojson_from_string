# Node JS Read CSV from string and conver it into JSON 

npm install node_csvtojson_from_string --save

## Example

```     
const csv = require('node_csvtojson_from_string');
const str = "Name,LastName\nABC,DEF\nGHI,JKL\nMNO,PQR";
csv.convertString(str).then(function(successData){
    console.log(successData);
    var obj = JSON.parse(JSON.stringify(successData));
    obj.forEach(elements => {
      console.log(elements['Name']+" "+elements.LastName);
    });
    
}, function(errorReason){
  console.log(errorReason);
  // Error Reason is either a string ("File does not exist")
  // or an error object returned from require('fs').readFile
}); ``` 
