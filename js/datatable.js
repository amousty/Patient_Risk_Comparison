function loadTableData(){

    $.getJSON( "data/MOCK_DATA.JSON", function( data ) {
      var items = [];
      var dangerosityAlert = "";
      $.each( data, function( id, val ) {
        var adm = val.admin;
        var biom = val.biometrie;
        var biol = val.const_biologique;
        var param = val.parametres;
        var asset = val.assuetudes;
        var values = [
          adm.nom,
          adm.prenom,
          adm.date_de_naissance,
          adm.genre == 'Male' ? 'M' : 'F',
          getBmi(biom.poids, biom.taille),
          ratioToPercent(biol.HbA1c) + '%',
          biol.Cholesterol_total,
          biol.Cholesterol_HDL,
          param.PSS,
          asset.Consommation_tabagique
        ];
        items.push(
          addTr(
            id,
            values,
            getDangerosity(biom.poids, 65, 80, 90),
            "addValueToTable",
            [
              "tblSelectedPatient",
              id,
              values,
              getDangerosity(biom.poids, 65, 80, 90),
              "",
              ""
            ]
          )
        );
        /*items.push("<tr id='" + id + "' class='" + getDangerosity(val.biometrie.poids, 65, 80, 90) + "' onclick='addToSelectedTable(\'' + id '\')'>");
          items.push("<td>" + val.admin.nom + "</td>" );
          items.push("<td>" + val.admin.prenom + "</td>" );
        items.push("</tr>");*/
      });


      $( "#tblData" ).append(items.join( "" ));
    });

}

function addValueToTable(target, id, values, cls, fct, params){
  $( "#" + target ).append(
    addTr(id, values, cls, fct, params)
  );
}

function addTr(id, values, cls, fct, params){
  var items = [];
  var onclickbuilder = fct != "" ? "onclick=" + fct + "(" + splitParams(params) + ")>" : ">";
  items.push("<tr id='" + id + "' class='" + cls + "'" + onclickbuilder);
  $.each( values, function( id, val ){
    items.push("<td class='text-center'>" + val + "</td>" );
  });
  items.push("</tr>");
  return items;
}

function splitParams(tblParams){
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

/* #TODO : remove the document ready and merge in shared js */
/*
    DOCUMENT READY
*/
$( document ).ready( function() {
    // We pass the IDs chosen by the doctor
    loadTableData();
});
