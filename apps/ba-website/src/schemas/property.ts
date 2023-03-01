import { BsFillHouseFill } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'property',
  type: 'document',
  title: 'Properties',
  icon: BsFillHouseFill,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 120,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Property Type',
      type: 'reference',
      to: { type: 'propertyCategory' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Area',
      type: 'reference',
      to: { type: 'area' },
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'bedrooms',
      type: 'number',
      title: 'Bedrooms',
      initialValue: 0,
    }),
    defineField({
      name: 'bathrooms',
      type: 'number',
      title: 'Bathrooms',
      initialValue: 0,
    }),
    defineField({
      name: 'size',
      type: 'number',
      title: 'Size',
      initialValue: 0,
    }),
    defineField({
      name: 'features',
      type: 'array',
      title: 'Features',
      of: [
        {
          type: 'reference',
          to: [{ type: 'propertyFeature' }],
        },
      ],
    }),
    defineField({
      name: 'agents',
      type: 'array',
      title: 'Property Agents',
      of: [
        {
          type: 'reference',
          to: [{ type: 'teamMember' }],
        },
      ],
    }),

    defineField({
      name: 'externalMedia',
      type: 'array',
      title: 'External Media',
      description: 'This can be links to embeddable videos, slides etc.',
      of: [
        {
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'mandateStart',
      type: 'datetime',
      title: 'Mandate Start',
    }),
    defineField({
      name: 'mandateEnd',
      type: 'datetime',
      title: 'Mandate End',
    }),
    defineField({
      name: 'virtualTour',
      type: 'url',
      title: 'Virtual Tour',
      description: 'A link to an embeddable 3D tour of the property.',
    }),
    defineField({
      name: 'property24Id',
      type: 'string',
      title: 'Property 24 Id',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'property24Link',
      type: 'url',
      title: 'Property 24 Link',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'addressLine1',
      media: 'featuredImage',
    },
  },
});
