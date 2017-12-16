var TABCOMPARATEDVALUE = ["Age", "BMI", "HbA1c (ratio)", "Total cholesterol (mg/dl)", "HDL cholesterol (mg/dl)", "Systolic blood pressure (mmHg)", "Smoking consumption (packs/year)"];
var color = Chart.helpers.color;
var barChartData = {
    labels: ["Age", "BMI", "HbA1c (ratio)", "Total cholesterol (mg/dl)", "HDL cholesterol (mg/dl)", "Systolic blood pressure (mmHg)", "Smoking consumption (packs/year)"],
    datasets: [{
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
    }]

}; // End barchardata

function GetJsonInObject(){
  var jqxhr = null;
  jxhr = $.getJSON( "data/MOCK_DATA.JSON");
  jxhr.fail(function() {
    alert("error when parsing");
  })
  return jxhr;
}

$( document ).ready( function() {
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
