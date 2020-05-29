var map;
var coord = []
var markers = []
function initMap() {
    // The location of Uluru
    
    var LA = {lat: 34.517, lng: -118.467};
    // The map, centered at Uluru
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: LA});
    // The marker, positioned at Uluru
    
    infoWindow = new google.maps.InfoWindow();
    displayStores()
    
}



function displayStores() {
    var html = ''
    var coordinates = []
    var bounds = new google.maps.LatLngBounds();
    stores.forEach((store, index)=> {

        var address = store.address
        var number = store.phoneNumber
        var loc = {lat: store.coordinates.latitude, lng: store.coordinates.longitude}
        html += `<div class="store-container">
        <div class="store-info-container">
            <div class="store-address">
                <span>${address.streetAddressLine1}</span>
                <span>${address.city} , ${address.countrySubdivisionCode} ${address.postalCode}</span>
            </div>
            <div class="store-phone-number">${number}</div>
        </div>
        <div class="store-number-container">
            <div class="store-number">
                ${index+1}
            </div>
        </div>
    </div>`
    bounds.extend(loc);
    createMarker(loc, store.name, address.streetAddressLine1)
    })

    document.querySelector(".stores-list").innerHTML = html
    map.fitBounds(bounds);
};

var event = document.getElementById("zip-search")
if(event){
    event.addEventListener("click", searchStore)
}

function searchStores(){
    var html = '';
    var coordinates = []
    var zip = document.getElementById('zip-code-input').value;
    console.log("in the function",zip)
    clearLocations();
    stores.forEach((store, index)=> {
        var address = store.address
        var number = store.phoneNumber
        if(address.postalCode.substring(0,5) === zip){
            var loc = {lat: store.coordinates.latitude, lng: store.coordinates.longitude}
                html += `<div class="store-container">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${address.streetAddressLine1}</span>
                        <span>${address.city} , ${address.countrySubdivisionCode} ${address.postalCode}</span>
                    </div>
                    <div class="store-phone-number">${number}</div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${index+1}
                    </div>
                </div>
            </div>`
            
            createMarker(loc, store.name, address.streetAddressLine1)
        } 
        })
        document.querySelector(".stores-list").innerHTML = html
        
}

function createMarker(latlng, name, address) {
    var html = "<b>" + name + "</b> <br/>" + address;
    var marker = new google.maps.Marker({
      map: map,
      position: latlng
    });
    google.maps.event.addListener(marker, 'mouseover', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;

    document.querySelector(".stores-list").innerHTML = "";
    var option = document.createElement("option");
    option.value = "none";
    option.innerHTML = "See all results:";
    document.querySelector(".stores-list").appendChild(option);
}
