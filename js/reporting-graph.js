/*
  DESCRIPTION :
  reporting-graph.js contains ONLY functions related to the graph.
*/

var CHART = (function() {
  // declare private variables and/or functions
  var TABCOMPARATEDVALUE = ["Age", "BMI", "HbA1c (ratio)", "Total cholesterol (mg/dl)", "HDL cholesterol (mg/dl)", "Systolic blood pressure (mmHg)", "Smoking consumption (packs/year)"];
  var OBJ_USERS = []; // Variable containing user data
  var barChartData = "";
  /*
    NAME : generateSingleUserData
    ROLE : Return an user in the form of an object
    PARAM :
      - singleUserData : JSON line of selected patient
    RETURN : the user object
  */
  function generateSingleUserData (singleUserData){
    // User : object containing useful information about patient
    /*"Age", "BMI", "HbA1c (ratio)", "Total cholesterol (mg/dl)", "HDL cholesterol (mg/dl)", "Systolic blood pressure (mmHg)", "Smoking consumption (packs/year)"*/
    var user = [];
    user.id = singleUserData.id;
    user.fullname  = singleUserData.admin.nom.toUpperCase() + " " + singleUserData.admin.prenom;
    user.age = HELPER.getAge(singleUserData.admin.date_de_naissance);
    user.bmi = HELPER.getBmi(singleUserData.biometrie.poids, singleUserData.biometrie.taille);
    user.HbA1c = HELPER.ratioToPercent(singleUserData.const_biologique.HbA1c); // a ratio is requested
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
  function generateChartData (){
    barChartData = {
        labels: TABCOMPARATEDVALUE,
        datasets : [] // will be filled after
    }; // End barchardata

    // DATA GENERATION
    for(var i = 0; i < OBJ_USERS.length; i++){
        var myNewDataset = {
          label : OBJ_USERS[i].fullname,
          backgroundColor : HELPER.hexToRgb(HELPER.TAB_COLOR[i], 0.5),
          borderColor : HELPER.hexToRgb(HELPER.TAB_COLOR[i], 1),
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
  function generateChart (){
    var ctx = $("#results-graph")[0].getContext("2d");
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

  return {
    // declare public variables and/or functions
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
    generateFullChartFromJSON : function (tabIdUSer, JSONObj){
      // 0. Clean the array
      OBJ_USERS = [];

      // 1. Check if tabIdUser is empty
      if(tabIdUSer.length != 0){
        $('#graph-container').show("slow");
        // Search if given user exist in json file
        for(var indexUsr = 0; indexUsr < tabIdUSer.length && indexUsr < 4; indexUsr++){
          $.each(JSONObj, function( index, value ) {
            if(tabIdUSer[indexUsr] == value.id){
              // 2. Return found user as object, increment array of users
              OBJ_USERS[indexUsr] = generateSingleUserData(value);
            }
          });
          // Fill data to the chart
          generateChartData();
        }
      }

      else{
        $('#graph-container').hide( "slow");
        // If empty we destroy the element
        CHART.destroyChartCanvas();
      }
    },

    /*
      NAME : destroyChartCanvas
      ROLE : Clean the chart
      PARAM : /
      RETURN : /
    */
    destroyChartCanvas : function (){
      $('#results-graph').remove(); // this is my <canvas> element
      $('#graph-container').append('<canvas id="results-graph"><canvas>');
    },
  }

})();
