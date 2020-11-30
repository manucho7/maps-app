import {useState, useRef, useEffect, useCallback} from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWNobzciLCJhIjoiY2tpNG5nazI0MDFjODMwbWx1NjJvanRlMyJ9.xnDS8yKmi2SDrguz4xxqmg';


export const useMapBox = (puntoInicial) => {

    //Referencia al DIV del mapa
    const mapaDiv = useRef();
    //Al usar useCallback va a memorizar su producto
    const setRef = useCallback( (node) => {
        mapaDiv.current = node;
    },[])

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
    }, [puntoInicial]);

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

    return {
        coords,
        setRef,
    }
}
