 /* Les options pour afficher la France */
 const mapOptions = {
    center: [46.225, 0.132],
    zoom: 10,
}

/* Les options pour affiner la localisation */
const locationOptions = {
    maximumAge: 10000,
    timeout: 5000,
    enableHighAccuracy: true
};

/* Créer la */
var map = new L.map("maCarte", mapOptions);

/* Création de la couche OpenStreetMap */
var layer = new L.TileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });

/* Ajoute la couche de la carte */
map.addLayer(layer);

/* Verifie que le navigateur est compatible avec la géolocalisation */
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(handleLocation, handleLocationError, locationOptions);
} else {
    /* Le navigateur n'est pas compatible */
    alert("Géolocalisation indisponible");
}

function handleLocation(position) {
    /* Zoom avant de trouver la localisation */
    map.setZoom(16);
    /* Centre la carte sur la latitude et la longitude de la localisation de l'utilisateur */
    map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
}

function handleLocationError(msg) {
    alert("Erreur lors de la géolocalisation");
}


fetch("cooperatives.json")
.then(reponse => reponse.json())
.then(json => {
    console.log(json);
    json.forEach(element => {
        console.log(element.coordonees_gps);
    });
    const coords = json[0].coordonees_gps;
    console.log(coords);

    let marker = L.marker(coords, {}).addTo(map);

marker.bindPopup(json[0].Nom)

});
