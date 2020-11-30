import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import '../index.css';

//Cambiar api key
mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWNobzciLCJhIjoiY2tpNG5nazI0MDFjODMwbWx1NjJvanRlMyJ9.xnDS8yKmi2SDrguz4xxqmg';

const puntoInicial = {
    lng: 5,
    lat: 4,
    zoom: 2
}

export const MapaPage = () => {

    const mapaDiv = useRef();

    const [, setMapa] = useState(null);

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ puntoInicial.lng, puntoInicial.lat ],
            zoom: puntoInicial.zoom
        });

        setMapa(map);

    }, [])

    return (
        <>
            <div
                ref={ mapaDiv }
                className="mapContainer"
            />

        </>
    )
}
