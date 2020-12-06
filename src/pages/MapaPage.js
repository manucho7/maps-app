import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';

import { useMapBox } from '../hooks/useMapBox';
import '../index.css';


const puntoInicial = {
    lng: 5,
    lat: 4,
    zoom: 2
}

export const MapaPage = () => {

    const { setRef, coords, nuevoMarcador$, movimientoMarcador$, agregarMarcador } = useMapBox(puntoInicial);
    const { socket } = useContext( SocketContext );

    //Escuchar los marcadores existentes
    useEffect(() => {
        socket.on('marcadores-activos', (marcadores) => {
            for (const key of Object.keys(marcadores)) {
                agregarMarcador(marcadores[key], key);
            }
        });
    }, [socket, agregarMarcador]);

    //Observable new marker
    useEffect(() => {
        nuevoMarcador$.subscribe( marcador => {
            socket.emit('marcador-nuevo', marcador);
        });
    }, [nuevoMarcador$, socket]);

    //Observable movimiento de marcador
    useEffect(() => {
        movimientoMarcador$.subscribe( marcador => {
            // console.log(marcador.id);
        });
    }, [movimientoMarcador$]);

    //Escuchar nuevos marcadores
    useEffect(() => {
        socket.on('marcador-nuevo', ( marcador ) => {
            agregarMarcador(marcador, marcador.id);
        });
    }, [socket, agregarMarcador])

    return (
        <>
            <div className="info">
                lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
            </div>

            <div
                ref={ setRef }
                className="mapContainer"
            />

        </>
    )
}
