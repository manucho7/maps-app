import {useState, useRef, useEffect, useCallback} from 'react';
import mapboxgl from 'mapbox-gl';
import {v4} from 'uuid';
import { Subject } from 'rxjs';


mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWNobzciLCJhIjoiY2tpNG5nazI0MDFjODMwbWx1NjJvanRlMyJ9.xnDS8yKmi2SDrguz4xxqmg';


export const useMapBox = (puntoInicial) => {

    //Referencia al DIV del mapa
    const mapaDiv = useRef();
    //Al usar useCallback va a memorizar su producto
    const setRef = useCallback( (node) => {
        mapaDiv.current = node;
    },[]);

    //Referencia a los marcadores
    const marcadores = useRef({});

    //Observables RXJS
    const movimientoMarcador = useRef(new Subject());
    const nuevoMarcador = useRef(new Subject());

    //Mapa y coords
    const mapa = useRef();
    const [coords, setCoords] = useState( puntoInicial );


    //Funcion para agregar marcadores
    const agregarMarcador = useCallback( (ev, id) => {
        const { lng, lat } = ev.lngLat || ev;

        const marker = new mapboxgl.Marker();
        marker.id = id ?? v4();

        marker
            .setLngLat([lng, lat])
            .addTo( mapa.current )
            .setDraggable(true);
        
        marcadores.current[marker.id] = marker;

        //objeto marcador con id, lng, lat, recibido por subscribe en mapapage
        if (!id) {
            nuevoMarcador.current.next({
                id: marker.id,
                lng, 
                lat
            });
        }

        //Escuchar movimientos del marcador
        marker.on('drag', ({ target }) => {
            const { id } = target;
            const { lng, lat } = target.getLngLat();

            movimientoMarcador.current.next({id, lng, lat});
        });
    },[]);


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

    //Agregar marcadores cuando hacemos click en mapa
    useEffect(() => {
        mapa.current?.on('click', agregarMarcador);
    }, [agregarMarcador]);

    return {
        coords,
        setRef,
        marcadores,
        agregarMarcador,
        nuevoMarcador$: nuevoMarcador.current,
        movimientoMarcador$: movimientoMarcador.current
    }
}
