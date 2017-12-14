$( document ).ready(function() {
    parsingData();
});


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
      * cholesterol_total
      * Cholesterol_HDL
  - parametres
      * PSS
  - assuetudes
      * Consommation_tabagique
*/

// https://www.w3schools.com/js/js_json_arrays.asp
function parsingData(){
  $.getJSON( "data/MOCK_DATA.JSON", function( data ) {
    var items = [];
    var dangerosityAlert = "";
    $.each( data, function( id, val ) {
      items.push("<tr id='" + id + "' class='" + getDangerosity(val.biometrie.poids, 65, 80, 90) + "'>");
        items.push("<td>" + val.admin.nom + "</td>" );
        items.push("<td>" + val.admin.prenom + "</td>" );
      items.push("</tr>");
    });

    $( "<table/>", {
      "class": "table",
      html: items.join( "" )
    }).appendTo( "#body-content" );
  });
}

function getDangerosity(valueToCheck, okValue, warningValue, alertValue){
  var dangerosityAlert = "table-danger";
  if(valueToCheck <= okValue){
    dangerosityAlert = "table-success";
  }
  else if (valueToCheck > okValue && valueToCheck <= warningValue){
    dangerosityAlert = "table-warning";
  }
  return dangerosityAlert
}
