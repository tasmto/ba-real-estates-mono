import { BsGrid3X2GapFill } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'propertyCategory',
  title: 'Property Categories',
  type: 'document',
  icon: BsGrid3X2GapFill,
  fields: [
    defineField({
      name: 'name',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 120,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Featured Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'icon',
      type: 'image',
      title: 'Category Icon',
      validation: (Rule) => Rule.required(),
      options: {
        accept: 'image/png, image/svg+xml',
      },
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
  ],
});
