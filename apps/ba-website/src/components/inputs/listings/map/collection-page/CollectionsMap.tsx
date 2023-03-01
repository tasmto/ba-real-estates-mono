'use client';

import React, { useDeferredValue, useEffect } from 'react';
import {
    Marker,
    MapContainer,
    TileLayer,
    Popup,
    CircleMarker,
} from 'react-leaflet';
// import { Marker, MarkerLayer } from 'react-leaflet-marker';
import { Area } from 'types';

import 'leaflet/dist/leaflet.css';
import { HiArrowsPointingIn } from 'react-icons/hi2';
import ToolTip from '@/components/common/ToolTip';
import clsx from 'clsx';
import {
    listingMapOpenAtom,
    selectedAreaAtom,
} from 'src/app/(user)/(listings)/listings/(components)/Wrapper';
import { useAtom } from 'jotai';

export type CollectionsMapProps = {
    locations: Area[];
    zoom?: number;
    onClose?: () => void;
    className?: string;
};

const CollectionsMap = ({
    locations,
    zoom,
    onClose,
    className,
}: CollectionsMapProps) => {
    const [, updateState] = React.useState<any>();
    const defLocations = useDeferredValue(locations);
    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtom);
    const [listingsMapOpen, setListingsMapOpen] = useAtom(listingMapOpenAtom);

    if (!defLocations || defLocations?.length <= 0) return <></>;
    if (typeof window === 'undefined') return <></>;

    return (
        <div
            className={clsx(['relative', className])}
            key={locations.map((item) => item.location?.place_id).join('map-container--outer')}
        >
            {typeof onClose !== 'undefined' && (
                <button onClick={onClose} className='absolute top-3 right-3 z-[40000]'>
                    <ToolTip title='Close Map'>
                        <HiArrowsPointingIn className='h-10 w-10 border   border-gray-300 bg-gray-50 p-2  text-slate-900 hover:bg-gray-100' />
                    </ToolTip>
                </button>
            )}
            <MapContainer
                center={selectedArea?.location?.coordinates || [-33.9249, 18.4241]}
                zoom={zoom || 11}
                scrollWheelZoom={true}
                className='h-full w-full'
                maxZoom={12}
                minZoom={10}
                key={defLocations.map((item) => item.location?.place_id).join('map-container--inner')}
            >
                <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
                />

                {listingsMapOpen
                    ? defLocations?.map((location, i) =>
                        location.location?.coordinates ? (

                            <CircleMarker className='scale-2'
                                pathOptions={{
                                    color: '#1e6760',
                                    fillOpacity:
                                        selectedArea?.location?.place_id ===
                                            location?.location.place_id
                                            ? 0.8
                                            : 0.4,
                                    // stroke: false,

                                }}
                                radius={selectedArea?.location?.place_id ===
                                    location?.location.place_id ? 18 : 12}
                                center={location.location?.coordinates}
                                eventHandlers={{
                                    click(e) {

                                        setSelectedArea(location);

                                    },
                                }}
                                key={location.location.place_id + 'circle' + i}
                            >
                                {/* <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup> */}
                            </CircleMarker>

                        ) : (
                            null
                        )
                    )
                    : null}
            </MapContainer>
        </div>
    );
};

export default CollectionsMap;
