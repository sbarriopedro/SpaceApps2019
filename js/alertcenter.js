const petition = new XMLHttpRequest();
petition.open("get", "jsons-mock/target.json");
petition.responseType = "json";
petition.send();
petition.addEventListener("load", function(){
    
    var geodata = petition.response.points;
    var alertCenter = document.querySelector("#alertCenter");
    var bloomAlert = document.querySelector("#bloomAlert");
    var bloomData = document.querySelector("#bloomData");
    var latitude = document.querySelector("#latitude");
    var longitude = document.querySelector("#longitude");

    var lucky = geodata.filter(function(pos) {
        return pos.cellcount != '0.0' && pos.cellcount > 1000000;
    });

    for (i = 0; i < 6; i++) {
        alertCenter.innerHTML += '<button class="alertBtn" onclick="showAlert('+i+')">DANGER ZONE '+i+'</button>'
        bloomAlert.innerHTML += '<div id="bloomAlert'+i+'" class="hidden alertContainer"><h2>Algae Danger in coordinates: '+lucky[i].latitude+', '+lucky[i].longitude+'</h2><table id="dataTable'+i+'"><tr><th scope="col">Coordinates</th><td>'+lucky[i].latitude+', '+lucky[i].longitude+'</td></tr></tr><th scope="col">Cellcount:</th><td>'+lucky[i].cellcount+'</td></tr><tr><th scope="col">Location: </th><td>Florida, US</td></tr><tr rowspan="2"><td scope="col" colspan="4"><button onclick="showAlertCenter('+i+')"> Go Back </button></td></tr><tr rowspan="2"><td scope="col" colspan="4"><button onclick="inputLocation('+lucky[i].latitude+', '+lucky[i].longitude+')"> Show Data </button></td></tr></table>';
    }
})
function inputLocation(lat, long){
    latitude.value = lat;
    longitude.value = long;
    console.log(latitude.value);
    console.log(longitude.value);
}

function showAlert(i) {
    document.querySelector("#bloomAlert"+ i).className = "visible alertContainer";
    document.querySelector("#dataTable"+i).className = "animated fadeInRight";
    document.querySelector("#alertCenter").className = "hidden"
}


function showAlertCenter(i) {
    document.querySelector("#alertCenter").className = "visible animated fadeInDown";
    document.querySelector("#bloomAlert"+ i).className = "hidden"
}

/*function inputLocation(i){
    latitude.value = lucky[i].latitude;
    longitude.value = lucky[i].longitude;
}*/