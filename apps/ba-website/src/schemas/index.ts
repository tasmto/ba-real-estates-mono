import { SchemaTypeDefinition } from 'sanity';

import areas from './areas';
import blockContent from './blockContent';
import post from './post';
import property from './property';
import category from './propertyCategory';
import propertyFeature from './propertyFeature';
import teamMember from './teamMember';

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  category,
  blockContent,
  propertyFeature,
  property,
  teamMember,
  areas,
];

export default schemaTypes;
