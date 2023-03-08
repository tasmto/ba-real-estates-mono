"use client"

// https://stackoverflow.com/questions/74289687/leaflet-implementation-on-next-js-13
import { FunctionComponent, useEffect, useState } from 'react';

import { CollectionsMapProps } from '@/components/inputs/listings/map/collection-page/CollectionsMap';



// this is a "barrel file" that prevents the ClientMap from ever getting loaded in the server.
export const ClientOnlyCollectionsMap: FunctionComponent<CollectionsMapProps> = (props) => {
    const [Client, setClient] = useState<FunctionComponent<CollectionsMapProps>>();

    useEffect(() => {
        (async () => {
            if (typeof global.window !== "undefined") {
                const newClient = (await import('./CollectionsMap')).default
                setClient(() => newClient);
            }
        })();
    }, [])

    if (typeof global.window === "undefined" || !Client) {
        return null;
    }

    return Client ? <Client {...props} /> : null;
}

export default ClientOnlyCollectionsMap