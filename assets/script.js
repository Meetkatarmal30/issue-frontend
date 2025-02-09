document.addEventListener("DOMContentLoaded", function () {
    // Navigate to User Dashboard
    document.getElementById("userButton")?.addEventListener("click", function () {
        window.location.href = "pages/user_dashboard.html";
    });

    // Navigate to Host Dashboard
    document.getElementById("hostButton")?.addEventListener("click", function () {
        window.location.href = "pages/host_dashboard.html";
    });

    // Initialize Leaflet Map
    if (document.getElementById("map")) {
        var map = L.map("map").setView([19.076, 72.8777], 10); // Default location

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors"
        }).addTo(map);

        // User location fetch
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var userMarker = L.marker([position.coords.latitude, position.coords.longitude])
                        .addTo(map)
                        .bindPopup("Your Location")
                        .openPopup();
                },
                function () {
                    console.log("Geolocation access denied.");
                }
            );
        }

        // Allow users to select location
        var marker;
        map.on("click", function (e) {
            if (marker) {
                map.removeLayer(marker);
            }
            marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
            document.getElementById("location-coordinates").textContent = `${e.latlng.lat}, ${e.latlng.lng}`;
        });
    }
});
