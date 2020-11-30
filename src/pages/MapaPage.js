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

    // const [mapa, setMapa] = useState();
    const mapa = useRef();
    const [coords, setCoords] = useState( puntoInicial );

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ puntoInicial.lng, puntoInicial.lat ],
            zoom: puntoInicial.zoom
        });

        mapa.current = map;
    }, []);

    //Cuando se mueve el mapa. Usando ? como condicional para ver si tiene valor la variable mapa
    useEffect(() => {
        mapa.current?.on('move', () => {
            const {lng, lat} = mapa.current.getCenter();
            
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2)
            });
        });

    }, []);

    return (
        <>
            <div className="info">
                lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
            </div>

            <div
                ref={ mapaDiv }
                className="mapContainer"
            />

        </>
    )
}
