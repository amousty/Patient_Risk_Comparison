var TABCOMPARATEDVALUE = ["Age", "BMI", "HbA1c (ratio)", "Total cholesterol (mg/dl)", "HDL cholesterol (mg/dl)", "Systolic blood pressure (mmHg)", "Smoking consumption (packs/year)"];
// #TODO: DELETE THIS SHIT AFTER TEST
var TABUSRID = [1,2];
var OBJ_USERS = [];

var color = Chart.helpers.color;
var barChartData = "";

/*  DCUMENT READY */
$( document ).ready( function() {
    GetJsonInObject(TABUSRID);
    generateChartData();
    
    var ctx = $("#canvas")[0].getContext("2d");
    window.myBar = new Chart(ctx, {
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


    /* ONCLICK */
    $('#randomizeData').click(function() {
        var zero = Math.random() < 0.2 ? true : false;
        barChartData.datasets.forEach(function(dataset) {
            dataset.data = dataset.data.map(function() {
                return zero ? 0.0 : randomScalingFactor();
            });

        });
        window.myBar.update();
    });

    var colorNames = Object.keys(window.chartColors);
    $('#addDataset').click(function() {
        var colorName = colorNames[barChartData.datasets.length % colorNames.length];;
        var dsColor = window.chartColors[colorName];
        var newDataset = {
            label: 'Dataset ' + barChartData.datasets.length,
            backgroundColor: color(dsColor).alpha(0.5).rgbString(),
            borderColor: dsColor,
            borderWidth: 1,
            data: []
        };

        for (var index = 0; index < barChartData.labels.length; ++index) {
            newDataset.data.push(randomScalingFactor());
        }

        barChartData.datasets.push(newDataset);
        window.myBar.update();
    });

    $('#addData').click(function() {
        if (barChartData.datasets.length > 0) {
            var ComparatedValues = TABCOMPARATEDVALUE[barChartData.labels.length % TABCOMPARATEDVALUE.length];
            barChartData.labels.push(ComparatedValues);

            for (var index = 0; index < barChartData.datasets.length; ++index) {
                //window.myBar.addData(randomScalingFactor(), index);
                barChartData.datasets[index].data.push(randomScalingFactor());
            }

            window.myBar.update();
        }
    });

    $('#removeDataset').click(function() {
        barChartData.datasets.splice(0, 1);
        window.myBar.update();
    });
});

/* JSON RELATED FUNCTIONS */
function GetJsonInObject(tabIdUSer){
  // 1. Variables
  var indexUsr = 0;
  // 2. Search if given user exist in json file
  $.getJSON( "data/MOCK_DATA.JSON", function( data ) {
    for(indexUsr = 0; indexUsr < tabIdUSer.length; indexUsr++){
      $.each( data, function( index, value ) {
        if(tabIdUSer[indexUsr] == value.id){
          // Return found user as object
          OBJ_USERS[indexUsr] = generateSingleUserData(value);
        }
      });
    }
  });
}

function generateSingleUserData(singleUserData){
  /*"Age", "BMI", "HbA1c (ratio)", "Total cholesterol (mg/dl)", "HDL cholesterol (mg/dl)", "Systolic blood pressure (mmHg)", "Smoking consumption (packs/year)"*/
  var user = [];
  user.id = singleUserData.id;
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
      labels: ["Age", "BMI", "HbA1c (ratio)", "Total cholesterol (mg/dl)", "HDL cholesterol (mg/dl)", "Systolic blood pressure (mmHg)", "Smoking consumption (packs/year)"],
      /*datasets: [{
          label: 'Username 1',
          backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
          borderColor: window.chartColors.red,
          borderWidth: 1,
          data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
          ]
      }, {
          label: 'Username 2',
          backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
          borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
          ]
      }]*/

  }; // End barchardata

  // DATA GENERATION
  for(var i = 0; i < OBJ_USERS.length; i++){
      var ComparatedValues = TABCOMPARATEDVALUE[barChartData.labels.length % TABCOMPARATEDVALUE.length];
      barChartData.labels.push(ComparatedValues);

      for (var index = 0; index < barChartData.datasets.length; ++index) {
          //window.myBar.addData(randomScalingFactor(), index);
          barChartData.datasets[index].data.push(OBJ_USERS[index]);
      }

      window.myBar.update();
  }
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
