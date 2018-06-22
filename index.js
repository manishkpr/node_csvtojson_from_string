/**
 * Read Data from file
 */
function readFileData(resolve, reject,
    options) {
    return function(err, data) {
      var output = [];
      var _data = data.toString();
      var firstRowIndent = _data.indexOf(
        '\n');
      var firstRow = _data.substring(0,
        firstRowIndent).split(',');
      if (readFileData__arrayIsEmpty(
          firstRow)) {
        return resolve(output);
      }
      var otherRows = _data.substring(
        firstRowIndent + 1, _data.length
      ).split('\n');
      if (readFileData__arrayIsEmpty(
          otherRows)) {
        return resolve(output);
      }
      for (var key in otherRows) {
        if (!otherRows[key]) continue;
        var _obj = {};
        var _element =
          readFileData__convertToArray_2(
            otherRows[key]);
        //console.log('element after',_element);
        /** Handle any kind of comma within double quotes */
        for (var key in firstRow) {
          if (!firstRow[key]) continue;
          firstRow[key] = firstRow[key]
            .replace(/^"|"$|\r|\t|\n/g,
              '');
  
          var str = _element[key];
          _obj[firstRow[key]] = typeof str ===
            'string' ? str.replace(
              /^"|"$|\r|\t|\n/g, '') :
            str;
        }
        output.push(_obj)
      }
      /** Apply options if there are any */
      if (options) {
        output = _applyOptions(output,
          options);
      }
      resolve(output);
    }
  }
  
  /**
   * Read file data - empty array check
   */
  function readFileData__arrayIsEmpty(arr) {
    if (arr.length < 1) {
      return true;
    }
    for (var key in arr) {
      if (arr[key]) {
        return false;
      }
    }
    return true;
  }
  
  /**
   * Convert String
   */
  exports.convertString = function (stringData,
    options) {
    return new Promise(function(resolve,
      reject) {
      readFileData(resolve, reject,
        options)(null, stringData);
    });
  }
  
  /**
   *  Read file data -
   */
  function readFileData__convertToArray(
    str) {
    var commaRegExp = new RegExp(
      '([^,]+)', 'g');
    /** Start with single double quotes only */
    var startWithQuotes = new RegExp(
      '^(\"[^\"]|\s+\"[^\"])');
    /** Ends with single double quotes only */
    var endWithQuotes = new RegExp(
      '([^\"](\"|\"\s+))$');
    var _keepstr = '';
    var _output = [];
    str.replace(commaRegExp, function(
      match) {
      if (startWithQuotes.test(match)) {
        //console.log('start with quotes');
        if (endWithQuotes.test(match)) {
          /** Starts with double quotes and ends with double quotes **/
          _output.push(match);
        }
        else {
          /** Add to cache so it can be concatenated **/
          _keepstr = match.substring(
            1, match.length) + ',';
        }
      }
      else if (endWithQuotes.test(
          match)) {
        //console.log('end with quotes');
        /** Does not end with single double quotes so keep it for now **/
        _keepstr += match.substring(0,
          match.length - 1);
        _output.push(_keepstr);
        _keepstr = '';
      }
      else if (_keepstr.length > 0) {
        //console.log('length > 0');
        /** Add to _keepstr and move on */
        _keepstr += match + ',';
      }
      else {
        //console.log('length 0 with quotes');
        /** _keepstr is length 0 so just a normal string. add to stack */
        _output.push(match);
      }
    })
    return _output;
  }

 function readFileData__convertToArray_2(line) {

   var dataArray = [];
   var tempString = "";
   var lineLength = line.length;
   var index = 0;
   while (index < lineLength) {
     if (line[index] == '"') {
       var index2 = index + 1;
       while (line[index2] != '"') {
         tempString += line[index2];
         index2++;
       }
       dataArray.push(tempString);
       tempString = "";
       index = index2 + 2;
       continue;
     }
     if (line[index] != ",") {
       tempString += line[index];
       index++;
       continue;
     }
     if (line[index] == ",") {
       dataArray.push(tempString);
       tempString = "";
       index++;
       continue;
     }

   }
   dataArray.push(tempString);
   return dataArray;

   return _output;

 }
