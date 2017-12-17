/* https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd */
/*
  NAME : getAge
  ROLE : Return an age according to a birthdate
  PARAM : Birthdate
  RETURN : Age
*/
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/*
  NAME : getBmi
  ROLE : return BMI of the patient
  PARAM :
    - weight : weight of the patient
    - height : height of the patient
  RETURN : BMI value
*/
function getBmi(weight, height){
  // Height divided by 100 because formula is based on meters and no cm
  return weight / ((height/100) * (height/100));
}

/*
  NAME : hexToRgb
  ROLE : transform an hex colour in rgba coulour
  PARAM :
    - hex : hexadecimal value
    - opacity : value between 0 and 1
  RETURN : rgba tranformed value
*/
function hexToRgb(hex, opacity) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return "rgba(" + r + "," + g + "," + b + ", " + opacity + ")";
}

/*
  NAME : ratioToPercent
  ROLE : Return a value between 0 nd 100
  PARAM : ratio
  RETURN : value in percentage
*/
function ratioToPercent(ratio){
  // If the value is > 100 -> it's not a correct value in parameter
  return ratio * 100 < 100 ? ratio * 100 : ratio;
}

/*
  NAME :
  ROLE :
  PARAM :
  RETURN :
*/
