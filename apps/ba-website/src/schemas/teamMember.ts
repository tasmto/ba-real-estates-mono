import { BsFillPeopleFill } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  icon: BsFillPeopleFill,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'role',
      title: 'Job Title',
      type: 'string',
      initialValue: 'Property Agent',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
    }),
    defineField({
      name: 'areas',
      title: 'Operational Areas',
      type: 'array',
      of: [{ type: 'area' }],
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'startedAt',
      title: 'Started at',
      type: 'datetime',
      initialValue: `${new Date().toISOString()}`,
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Please enter it without a plus (+) or a leading zero (0)',
      validation: (Rule) => Rule.min(9).max(15),
      // https://api.whatsapp.com/send?phone=653409650&text=seerererer
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      description: 'Please enter it without a plus (+) or a leading zero (0)',
      validation: (Rule) => Rule.min(9).max(15),
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook Profle',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Profle',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'Linkedin Profle',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: "Team Member's Email",
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'contactable',
      type: 'boolean',
      title: 'Display contact info',
      description:
        "Would you like this team member's contact info visible on the website?",
      initialValue: true,
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

  preview: {
    select: {
      name: 'name',
      subtitle: 'role',
      media: 'image',
    },
    prepare(selection) {
      const { name, media, subtitle } = selection;
      return {
        ...selection,
        title: name,
        media,
        subtitle,
      };
    },
  },
});
