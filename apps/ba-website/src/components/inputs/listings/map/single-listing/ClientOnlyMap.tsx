"use client"

// https://stackoverflow.com/questions/74289687/leaflet-implementation-on-next-js-13
import { FunctionComponent, useEffect, useState } from 'react';

import { ListingMapProps } from '@/components/inputs/listings/map/single-listing/ListingMap';


// this is a "barrel file" that prevents the ClientMap from ever getting loaded in the server.
export const ClientOnlyListingMap: FunctionComponent<ListingMapProps> = (props) => {
    const [Client, setClient] = useState<FunctionComponent<ListingMapProps>>();

    useEffect(() => {
        (async () => {
            if (typeof global.window !== "undefined") {
                const newClient = (await import('./ListingMap')).default
                setClient(() => newClient);
            }
        })();
    }, [])

    if (typeof global.window === "undefined" || !Client) {
        return null;
    }

    return Client ? <Client {...props} /> : null;
}