'use client';
import React, { useState } from 'react';
import Geocode from 'react-geocode';
import { Spinner, Stack, Text, TextInput } from '@sanity/ui';
import { ObjectInputProps, set, unset } from 'sanity';
import { Area } from 'types';

import useDebounce from '../../..//hooks/useDebounce';
import useDidMountEffect from '../../..//hooks/useDidMountEffect';
import { MAPS_API_KEY } from '../../../constants/maps';

type LocationType = Area['location'];

const AreaInput: React.FC<ObjectInputProps<LocationType>> = ({
    onChange,
    value,
    elementProps,
}) => {
    Geocode.setApiKey(MAPS_API_KEY);
    Geocode.setLanguage('en');
    if (process.env.NODE_ENV === 'development') Geocode.enableDebug();
    console.log(value)

    const [areaName, setAreaName] = useState(
        value?.formatted_address ?? ''
    );
    const [loading, setLoading] = useState(false);
    const debouncedAreaName = useDebounce<string>(areaName, 5000, setLoading);

    useDidMountEffect(
        () => {
            if (debouncedAreaName)
                (async function () {
                    await Geocode.fromAddress(debouncedAreaName)
                        .then((data) => {
                            const results = data?.results[0];

                            if (!data || data.status !== "OK") throw new Error("Unable to find area")

                            const area = {
                                _type: 'location',
                                coordinates: { ...results?.geometry?.location, alt: 0 },
                                formatted_address: results?.formatted_address || '',
                                place_id: results?.place_id || '',
                                bounds: [
                                    { ...results?.geometry?.bounds?.northeast, alt: 0 },
                                    { ...results?.geometry?.bounds?.southwest, alt: 0 },
                                ],
                            };

                            onChange(area ? set(area) : unset());
                        })
                        .catch((err) => console.error(err));
                })();
        },
        [debouncedAreaName] // Only call effect if debounced search term changes
    );

    return (
        <Stack space={3}>
            <TextInput
                {...elementProps}
                onChange={(e) => setAreaName(e.currentTarget.value ?? '')}
                value={areaName}
            />
            <Text size={1} className="text-gray-400"><span className='text-gray-500'>Location:</span> {value?.formatted_address || 0}</Text>

            <Text size={1} className="text-gray-400"><span className='text-gray-500'>PlaceId:</span> {value?.place_id || 0}</Text>
            <Text size={1} className="text-gray-400"><span className='text-gray-500'>Coordinates:</span> (lat: {value?.coordinates?.lat || 'NAN'}) (lng: {value?.coordinates?.lng || 'NAN'})</Text>

            {loading && <div className='!flex gap-2 bg-gray-600 rounded-md text-gray-200'><Spinner muted /><span>Loading Address keep typing or please wait...</span></div>}

        </Stack>
    );
};

export default AreaInput;
