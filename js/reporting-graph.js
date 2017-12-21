/*
  Data tree
  ----------

  - id
  - admin
      * prenom
      * nom
      * date_de_naissance
      * genre
  - biometrie
      * poids
      * taille
  - const_biologique
      * HbA1c
      * Cholesterol_total
      * Cholesterol_HDL
  - parametres
      * PSS
  - assuetudes
      * Consommation_tabagique
*/

/*
  Global variables
*/
var TABCOMPARATEDVALUE = ["Age", "BMI", "HbA1c (ratio)", "Total cholesterol (mg/dl)", "HDL cholesterol (mg/dl)", "Systolic blood pressure (mmHg)", "Smoking consumption (packs/year)"];
// #TODO: DELETE THIS -> AFTER TEST
var TABUSRID = [
  Math.floor((Math.random() * 500) + 1),
  Math.floor((Math.random() * 500) + 1),
  Math.floor((Math.random() * 500) + 1),
  Math.floor((Math.random() * 500) + 1),
  Math.floor((Math.random() * 500) + 1)
];

var OBJ_USERS = []; // Variable containing user data
var TAB_COLOR = ["e62739", "FDB45C", "b56969", "46BFBD"]; // 4 possible colours
var barChartData = "";

/*
    DOCUMENT READY
*/
$( document ).ready( function() {
    // We pass the IDs chosen by the doctor
    //generateFullChartFromJSON(TABUSRID);
});

/*
  GRAPH GENERATION RELATED FUNCTIONS
*/

/*
  NAME : generateFullChartFromJSON
  ROLE :
    - Retrieve data from JSON
    - fill the array of selected users
    - call generateChartData
  PARAM :
    - tabIdUSer : array of user ids
  RETURN : /
*/
function generateFullChartFromJSON(tabIdUSer){
  // 1. Search if given user exist in json file
  $.getJSON( "data/MOCK_DATA.JSON", function( data ) {
    for(var indexUsr = 0; indexUsr < tabIdUSer.length && indexUsr < 4; indexUsr++){
      $.each( data, function( index, value ) {
        if(tabIdUSer[indexUsr] == value.id){
          // 2. Return found user as object, increment array of users
          OBJ_USERS[indexUsr] = generateSingleUserData(value);
        }
      });
      // 3. Fill data to the chart
      generateChartData();
    }
  });
}

/*
  NAME : generateSingleUserData
  ROLE : Return an user in the form of an object
  PARAM :
    - singleUserData : JSON line of selected patient
  RETURN : the user object
*/
function generateSingleUserData(singleUserData){
  // User : object containing useful information about patient
  /*"Age", "BMI", "HbA1c (ratio)", "Total cholesterol (mg/dl)", "HDL cholesterol (mg/dl)", "Systolic blood pressure (mmHg)", "Smoking consumption (packs/year)"*/
  var user = [];
  user.id = singleUserData.id;
  user.fullname  = singleUserData.admin.nom.toUpperCase() + " " + singleUserData.admin.prenom;
  user.age = getAge(singleUserData.admin.date_de_naissance);
  user.bmi = getBmi(singleUserData.biometrie.poids, singleUserData.biometrie.taille);
  user.HbA1c = ratioToPercent(singleUserData.const_biologique.HbA1c); // a ratio is requested
  user.Cholesterol_total = singleUserData.const_biologique.Cholesterol_total;
  user.Cholesterol_HDL = singleUserData.const_biologique.Cholesterol_HDL;
  user.PSS = singleUserData.parametres.PSS;
  user.Consommation_tabagique = singleUserData.assuetudes.Consommation_tabagique;
  return user;
}

/*
  NAME : generateChartData
  ROLE :
    - Generate shared data related to the chart
    - Generate dataset for each patient
    - Call generateChart
  PARAM : /
  RETURN : /
*/
function generateChartData(){
  barChartData = {
      labels: TABCOMPARATEDVALUE,
      datasets : [] // will be filled after
  }; // End barchardata

  // DATA GENERATION
  for(var i = 0; i < OBJ_USERS.length; i++){
      var myNewDataset = {
        label : OBJ_USERS[i].fullname,
        backgroundColor : hexToRgb(TAB_COLOR[i], 0.5),
        borderColor : hexToRgb(TAB_COLOR[i], 1),
        borderWidth : 1 ,
        data : [
          OBJ_USERS[i].age , // calculated data
          OBJ_USERS[i].bmi , // calculated data
          OBJ_USERS[i].HbA1c, // calculated data
          OBJ_USERS[i].Cholesterol_total ,
          OBJ_USERS[i].Cholesterol_HDL ,
          OBJ_USERS[i].PSS ,
          OBJ_USERS[i].Consommation_tabagique
        ]
      }
      barChartData.datasets.push(myNewDataset);
  }
  generateChart();
}

/*
  NAME : generateChart
  ROLE :
    - Draw the chart with selected options
  PARAM : /
  RETURN : /
*/
function generateChart(){
  var ctx = $("#canvas")[0].getContext("2d");
  window.myBarChart = new Chart(ctx, {
      type: 'bar', // Bar, Line and Radar are great
      data: barChartData,
      options: {
          responsive: true,
          barValueSpacing: 20,
          events: ['click'], // In order to avoid mousover bug
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
