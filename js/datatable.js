TAB_SELECTED_VALUES = [];
var JSONObj =  "";

/*
  NAME : loadTableData
  ROLE :
    - Read JSON DATA
    - Put this object withtin a var
    - Build table
    -  Transform table in datatable
  PARAM : /
  RETURN : /
*/
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

/*
  NAME : addTr
  ROLE :
    - Build a TR from table
    - Add it a function (with(out) param(s)) if requested
    - Add it a class if requested
  PARAM : /
  RETURN : /
*/
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

/*
  NAME : splitParams
  ROLE : Receive a table, transform it in readable param
  PARAM : table params [xxx, xxx, xxx]
  RETURN : acceptable string "xxx, xxx, xxx"
*/
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

/*
  NAME : getListOfSelectPatient
  ROLE : Return the list of selected patient
  PARAM : /
  RETURN : The list of selected patient
*/
function getListOfSelectPatient(){
  var list ="<span>List of selected patients :<span>";
  list += "<ul>";
  for(var i = 0; i < TAB_SELECTED_VALUES.length && i < 4; i++){
    $.each(JSONObj, function( index, value ) {
      if(TAB_SELECTED_VALUES[i] == value.id){
        list += "<li>";
        list += value.admin.nom.toUpperCase() + " " + value.admin.prenom
        list += "</li>";
      }
    });
  }
  list += "</ul>";
  return list;
}

/*
  NAME : selectValue
  ROLE :
    - Select or unselect a value from the datatable
    - Check if we have not more than 4 patients selected
    - Add class to selected patient
    - Call generateFullChartFromJSON()
  PARAM : /
  RETURN : /
*/
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
      // Clean previous list
      $('#modalPatientList').empty();
      // Build list
      $('#modalPatientList').append(getListOfSelectPatient);
      // Display modal
      $('#alertModal').modal('show');
    }
  }
  // Call from reporting-graph.js
  generateFullChartFromJSON(TAB_SELECTED_VALUES, JSONObj);
}


/*
  NAME : removePatient
  ROLE : remove class from all selected patients
  PARAM : /
  RETURN : /
*/
function removePatient(){
  $("#tbodyData tr").removeClass("table-success");
  // But we also need to clean the array
  TAB_SELECTED_VALUES = [];

  // And also clean graph
  destroyChartCanvas();
}
