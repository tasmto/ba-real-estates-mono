'use client';

import React from 'react';
import { CircleMarker, MapContainer, TileLayer } from 'react-leaflet';
import { MarkerLayer } from 'react-leaflet-marker';
import { SanityGeoPoint } from 'sanity-codegen';

import 'leaflet/dist/leaflet.css';


export type ListingMapProps = {
    zoom?: number;
    center?: SanityGeoPoint;
    pins?: SanityGeoPoint[];
};

const ListingMap = ({ center, pins, zoom }: ListingMapProps) => {

    if (!center || !center?.lat || !pins || pins?.length <= 0) return <></>;
    if (typeof window === 'undefined') return <></>

    return (
        <div className='relative'>
            <MapContainer
                center={[center?.lat, center?.lng]}
                zoom={zoom || 13}
                scrollWheelZoom={false}
                className='h-[250px] w-full sm:h-[350px] md:h-[450px]'

            >
                <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
                />
                {pins?.map((pin, i) => (
                    <MarkerLayer key={i}>
                        {/* <Marker position={[pin.lat, pin.lng]}>
                            <Image alt="" src={MapIcon} className="h-12 w-12" />
                        </Marker> */}
                        <CircleMarker center={[pin.lat, pin.lng]} radius={100} className="fill-primary-700 stroke-transparent" pathOptions={{ fillOpacity: 0.3 }}></CircleMarker>
                    </MarkerLayer>
                ))}
            </MapContainer>
        </div>
    );

};

export default ListingMap;



