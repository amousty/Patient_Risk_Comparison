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
    items.push( "<h1>" + "User" + "</h1>" );
    $.each( data, function( id, val ) {
      items.push( "<li id='" + id + "' class='list-group-item'>" + val.admin.nom + " " + val.admin.prenom + "</li>" );
    });

    $( "<ul/>", {
      "class": "list-group",
      html: items.join( "" )
    }).appendTo( "body" );
  });
}
