import { BsFillDoorOpenFill } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'propertyFeature',
  type: 'document',
  title: 'Property Features',
  icon: BsFillDoorOpenFill,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (Rule) => Rule.required(),
      options: {
        accept: 'image/png, image/svg+xml',
      },
    }),
    defineField({
      name: 'description',
      type: 'blockContent',
      title: 'Description',
    }),
    defineField({
      name: 'commonNames',
      type: 'array',
      title: 'Common Names',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'indoor',
      type: 'boolean',
      title: 'Indoor feature',
      description: 'Is this an indoor feature (in most cases)?',
      initialValue: false,
    }),
  ],
});
