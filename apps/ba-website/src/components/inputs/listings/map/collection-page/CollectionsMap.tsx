'use client';

import React, { useMemo } from 'react';
import { HiArrowsPointingIn } from 'react-icons/hi2';
import { CircleMarker, MapContainer, TileLayer } from 'react-leaflet';
import { MarkerLayer } from 'react-leaflet-marker';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import {
    listingMapOpenAtom,
    selectedAreaAtom,
} from 'src/app/(user)/(listings)/listings/[[...listingCategoryName]]/(components)/Wrapper';
// import { Marker, MarkerLayer } from 'react-leaflet-marker';
import { Area } from 'types';
import { PropertyWithLocation } from 'typings';

import ToolTip from '@/components/common/ToolTip';

import 'leaflet/dist/leaflet.css';

export type CollectionsMapProps = {
    listings: PropertyWithLocation[];
    zoom?: number;
    onClose?: () => void;
    className?: string;
};

const CollectionsMap = ({
    listings,
    zoom,
    onClose,
    className,
}: CollectionsMapProps) => {
    const uniqueLocations = useMemo<Array<Area>>(() => {
        const arr: Area[] = [];
        listings.forEach(
            (property) =>
                property.location.location?.coordinates &&
                !arr.find(
                    (item) =>
                        item.location?.place_id === property.location.location?.place_id
                ) &&
                arr.push(property.location)
        );
        return arr;
    }, [listings]);

    const [selectedArea, setSelectedArea] = useAtom(selectedAreaAtom);
    const [listingsMapOpen] = useAtom(listingMapOpenAtom);

    if (!uniqueLocations || uniqueLocations?.length <= 0) return <></>;
    if (typeof window === 'undefined') return <></>;

    return (
        <div
            id={'baMapContainerOuter'}
            title={selectedArea?.location?.coordinates ? 'Close' : 'Click on an area'}
            className={clsx([
                'relative',
                className,
                // selectedArea?.location?.coordinates &&
                // 'after:absolute after:top-0 after:left-0 after:z-[400] after:block after:h-full after:w-full after:bg-slate-900/10',
            ])}
            key={uniqueLocations
                .map((item) => item.location?.place_id)
                .join('map-container--outer')}
        // onClick={(e) => {
        //     if (
        //         selectedArea?.location?.coordinates &&
        //         e.currentTarget.getAttribute('id') === '#baMapContainerOuter'
        //     )
        //         setSelectedArea(undefined);

        // }}
        >
            {typeof onClose !== 'undefined' && (
                <button onClick={onClose} className='absolute top-3 right-3 z-[40000]'>
                    <ToolTip title='Close Map'>
                        <HiArrowsPointingIn className='h-10 w-10 border border-gray-300 bg-gray-50 p-2 text-slate-900 hover:bg-gray-100' />
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
                key={uniqueLocations
                    .map((item) => item.location?.place_id)
                    .join('map-container--inner')}
            >
                <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
                />
                <MarkerLayer>
                    {listingsMapOpen
                        ? uniqueLocations?.map((location, i) =>
                            location.location?.coordinates ? (
                                <CircleMarker
                                    className={clsx([
                                        selectedArea?.location?.place_id ===
                                            location?.location.place_id
                                            ? 'animate-[pulse_6s_ease-in-out_infinite]'
                                            : '',
                                    ])}
                                    pathOptions={{
                                        color: '#1e6760',
                                        fillOpacity:
                                            selectedArea?.location?.place_id ===
                                                location?.location.place_id
                                                ? 0.6
                                                : 0.4,

                                        // stroke: false,
                                    }}
                                    radius={
                                        selectedArea?.location?.place_id ===
                                            location?.location.place_id
                                            ? 32
                                            : 12
                                    }
                                    center={location.location?.coordinates}
                                    eventHandlers={{
                                        click(e) {
                                            selectedArea?.location?.place_id
                                                ? setSelectedArea(undefined)
                                                : setSelectedArea(location);
                                        },
                                    }}
                                    key={location.location.place_id + 'circle' + i}
                                >
                                    {/* <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup> */}
                                </CircleMarker>
                            ) : null
                        )
                        : null}
                </MarkerLayer>
            </MapContainer>
        </div>
    );
};

export default CollectionsMap;
