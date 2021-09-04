import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  // Transform search results to the required format
  // i.e object {latitude:32456, longitude:12324}

  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));

  const [selectedLocation, setSelectedLocation] = useState({});

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/abbas-abdelila/ckt5vr4fa2fby18s1lesxwa3l"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewPort) => setViewport(nextViewPort)}
    >
      {searchResults.map((result) => (
        <div>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={20}
            offsetTop={-10}
          >
            <p
              role="img"
              aria-label="push-pin"
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setSelectedLocation(result)}
            >
              📌
            </p>
          </Marker>

          {/* The popup when pins are clicked */}
          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
