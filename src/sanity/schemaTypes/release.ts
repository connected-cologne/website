import { defineField, defineType } from 'sanity';

export const releaseType = defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the album / release',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'soundcloudUrl',
      title: 'SoundCloud URL',
      type: 'url',
      description: 'Link to the SoundCloud playlist / set',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Manual sort order (ascending). Max. 3 releases are shown.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'soundcloudUrl',
    },
  },
});
