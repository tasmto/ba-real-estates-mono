import imageUrlBuilder from '@sanity/image-url';
import { SanityReference } from '@sanity/image-url/lib/types/types';

import { client } from './sanity.client';

const builder = imageUrlBuilder(client);

const urlFor = (source: SanityReference) => builder.image(source);
export default urlFor;
