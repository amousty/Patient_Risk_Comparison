var TABCOMPARATEDVALUE = ["Age", "BMI", "HbA1c (ratio)", "Total cholesterol (mg/dl)", "HDL cholesterol (mg/dl)", "Systolic blood pressure (mmHg)", "Smoking consumption (packs/year)"];
// #TODO: DELETE THIS SHIT AFTER TEST
var TABUSRID = [1,53];
var OBJ_USERS = [];

var color = Chart.helpers.color;
var barChartData = "";

/*  DCUMENT READY */
$( document ).ready( function() {
    generateFullChartFromJSON(TABUSRID);
});

/* JSON RELATED FUNCTIONS */
function generateFullChartFromJSON(tabIdUSer){
  // 1. Variables
  var indexUsr = 0;
  // 2. Search if given user exist in json file
  $.getJSON( "data/MOCK_DATA.JSON", function( data ) {
    for(indexUsr = 0; indexUsr < tabIdUSer.length; indexUsr++){
      $.each( data, function( index, value ) {
        if(tabIdUSer[indexUsr] == value.id){
          // Return found user as object, increment array of users
          OBJ_USERS[indexUsr] = generateSingleUserData(value);
        }
      });
      // Fill data to the chart
      generateChartData();
    }
  });
}

function generateSingleUserData(singleUserData){
  /*"Age", "BMI", "HbA1c (ratio)", "Total cholesterol (mg/dl)", "HDL cholesterol (mg/dl)", "Systolic blood pressure (mmHg)", "Smoking consumption (packs/year)"*/
  var user = [];
  user.id = singleUserData.id;
  user.fullname  = singleUserData.admin.nom.toUpperCase() + " " + singleUserData.admin.prenom;
  user.age = getAge(singleUserData.admin.date_de_naissance);
  user.bmi = getBmi(singleUserData.biometrie.poids, singleUserData.biometrie.taille);
  user.HbA1c = singleUserData.const_biologique.HbA1c;
  user.Cholesterol_total = singleUserData.const_biologique.Cholesterol_total;
  user.Cholesterol_HDL = singleUserData.const_biologique.Cholesterol_HDL;
  user.PSS = singleUserData.parametres.PSS;
  user.Consommation_tabagique = singleUserData.assuetudes.Consommation_tabagique;
  return user;
}

/* CHART GENERATION DATA RELATED FUNCTION */
function generateChartData(){
  barChartData = {
      labels: TABCOMPARATEDVALUE,
      datasets : []
  }; // End barchardata

  // DATA GENERATION
  for(var i = 0; i < OBJ_USERS.length; i++){
      var myNewDataset = {
        label : OBJ_USERS[i].fullname,
        backgroundColor : color(window.chartColors.red).alpha(0.5).rgbString(),
        borderColor : window.chartColors.blue,
        borderWidth : 1 ,
        data : [
          OBJ_USERS[i].age ,
          OBJ_USERS[i].bmi ,
          OBJ_USERS[i].HbA1c ,
          OBJ_USERS[i].Cholesterol_total ,
          OBJ_USERS[i].Cholesterol_HDL ,
          OBJ_USERS[i].PSS ,
          OBJ_USERS[i].Consommation_tabagique
        ]
      }
      barChartData.datasets.push(myNewDataset);
      //myBarChart.chart.config.data.datasets.push({ myNewDataset });
  }
  //window.myBarChart.update();
  generateChart();
}

function generateChart(){
  var ctx = $("#canvas")[0].getContext("2d");
  window.myBarChart = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
          responsive: true,
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: 'Risk viewer comparison'
          }
      }
  });
}
/* HELPERS #TODO : DEPLACE THIS TO HELPER.JS*/
/* https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd */
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

function getBmi(weight, height){
  return weight / (height * height);
}
