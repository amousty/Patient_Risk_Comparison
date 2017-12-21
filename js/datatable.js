TAB_SELECTED_VALUES = [];
var JSONObj =  "";

function loadTableData(){
    $.getJSON( "data/MOCK_DATA.JSON", function( data ) {
      JSONObj = data;
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
            val.id,
            values,
            "",
            "selectValue",
            [
              val.id
            ]
          )
        );
      });


      $( "#tbodyData" ).append(items.join( "" ));
      $('#tblData').DataTable();
    });

}

function addValueToTable(target, id, values, cls, fct, params){
  $( "#" + target ).append(
    addTr(id, values, cls, fct, params)
  );
}

function selectValue(id){
  if ($('#' + id ).hasClass( "table-success" )){
    $('#' + id).removeClass( "table-success" );
    var index = TAB_SELECTED_VALUES.indexOf(id);
    if (index > -1) {
      TAB_SELECTED_VALUES.splice(index, 1);
    }
  }
  else{
    if(TAB_SELECTED_VALUES.length < 4){
      $('#' + id).addClass( "table-success" );
      TAB_SELECTED_VALUES.push(id);
    }
    else{
      // #TODO : replace by modal who show current user selected
      alert('Please selecte only 4 patients maxium !');
    }
  }
  // Call from reporting-graph.js
  generateFullChartFromJSON(TAB_SELECTED_VALUES, JSONObj);
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
