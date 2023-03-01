import { BsMailbox2 } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'offices',
  title: 'Offices',
  type: 'document',
  icon: BsMailbox2,
  fields: [
    defineField({
      name: 'street',
      title: 'Street address',
      type: 'string',
    }),
    defineField({
      name: 'suburb',
      title: 'Suburb',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'South Africa',
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Short write up',
      type: 'text',
    }),
    defineField({
      name: 'areas',
      title: 'Operational Area',
      type: 'array',
      of: [{ type: 'area' }],
    }),
    defineField({
      name: 'image',
      title: 'Primary office Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Office gallery images',

      type: 'array',
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
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'number',
      description: 'Please enter it without a plus (+) or a leading zero (0)',
      validation: (Rule) => Rule.min(9).max(15),
    }),
    defineField({
      name: 'email',
      title: "Team Member's Email",
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'location',
      title: 'Office Location',
      type: 'area',
    }),
  ],

  preview: {
    select: {
      name: 'name',
      surname: 'surname',
      subtitle: 'role',
      media: 'image',
    },
    prepare(selection) {
      const { name, surname, media, subtitle } = selection;
      return {
        ...selection,
        title: `${name || ''} ${surname || ''}`,
        media,
        subtitle,
      };
    },
  },
});
