import { BsFillPinMapFill } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

import AreaInput from '../components/studio/inputs/AreaInput';

export default defineType({
  name: 'area',
  title: 'Property Areas',
  type: 'document',
  icon: BsFillPinMapFill,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The name of the location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description:
        'This uses Google maps to format the address so make sure you double check the area.',
      type: 'object',
      components: {
        // @ts-expect-error: This input type is mismatched but works
        input: AreaInput,
      },
      fields: [
        {
          name: 'coordinates',
          type: 'geopoint',
          title: 'Coordinates',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'formatted_address',
          type: 'string',
          title: 'Full address',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'place_id',
          type: 'string',
          title: 'Full address',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
});
