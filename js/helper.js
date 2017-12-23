/*
  DESCRIPTION :
  Helper.js functions could be called from every page.
  It contains useful common functions.
*/


var HELPER = (function() {
    // NO PRIVATE ITEMS IN HELPER.JS

    return {
      // 4 possible colours
      TAB_COLOR : ["e62739", "FDB45C", "b56969", "46BFBD"],

      // declare public variables and/or functions
      /*
        NAME : getAge
        ROLE : Return an age according to a birthdate
        PARAM : Birthdate
        RETURN : Age
        SOURCE : https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
      */
      getAge : function (dateString) {
          var today = new Date();
          var birthDate = new Date(dateString);
          var age = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
          }
          return age;
      },

      /*
        NAME : formatDate
        ROLE : format the date in a requested format
        PARAM :
          - birthDate
          - format (yyyymmdd / mmddyyyy + ddmmyyyy)
          - separator (/, -, ...) OPTIONAL
        RETURN : date
      */
      formatDate : function (dateString, format, separator) {
          // Separator is an optional arg
          separator = (typeof separator === 'undefined') ? '/' : separator;
          var birthDate = new Date(dateString);
          var parsedDate = "";
          switch(format){
            case 'yyyymmdd' :
              parsedDate = birthDate.getFullYear() + separator + birthDate.getDate() + separator + birthDate.getDay();
              break;
            case 'mmddyyyy' :
              parsedDate =  birthDate.getDate() + separator + birthDate.getDay() + separator +  birthDate.getFullYear();
              break;
            case 'ddmmyyyy' :
            default:
              parsedDate = birthDate.getDay() + separator + birthDate.getDate() + separator +birthDate.getFullYear() ;
              break;
          }
          return parsedDate ;
      },

      /*
        NAME : getBmi
        ROLE : return BMI of the patient
        PARAM :
          - weight : weight of the patient
          - height : height of the patient
        RETURN : BMI value
      */
      getBmi : function (weight, height){
        // Height divided by 100 because formula is based on meters and no cm
        // Round at 2 number after comma
        return (weight / ((height/100) * (height/100))).toFixed(2);
      },

      /*
        NAME : hexToRgb
        ROLE : transform an hex colour in rgba coulour
        PARAM :
          - hex : hexadecimal value
          - opacity : value between 0 and 1
        RETURN : rgba tranformed value
      */
      hexToRgb : function (hex, opacity) {
          var bigint = parseInt(hex, 16);
          var r = (bigint >> 16) & 255;
          var g = (bigint >> 8) & 255;
          var b = bigint & 255;

          return "rgba(" + r + "," + g + "," + b + ", " + opacity + ")";
      },

      /*
        NAME : ratioToPercent
        ROLE : Return a value between 0 nd 100
        PARAM : ratio
        RETURN : value in percentage
      */
      ratioToPercent : function (ratio){
        // If the value is > 100 -> it's not a correct value in parameter
        return ratio * 100 < 100 ? (ratio * 100).toFixed(2) : ratio;
      },

      /*
        NAME : splitParams
        ROLE : Receive a table, transform it in readable param
        PARAM : table params [xxx, xxx, xxx]
        RETURN : acceptable string "xxx, xxx, xxx"
      */
      splitParams : function (tblParams){
        // Get an array
        var res = ""
        if(typeof tblParams !== "undefined"){
          for(var i = 0; i < tblParams.length; i++){
            if(tblParams[i] != "" && tblParams[i] != null){
              res += "'" + tblParams[i]  + "',";
            }
          }
          res = res.replace(/'/g, '"');
          return res.substring(0, res.length - 1); // retrieve the latest ','
        }
        return res;
      }
    };

})();
