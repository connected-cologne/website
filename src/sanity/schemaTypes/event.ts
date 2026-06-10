import { defineField, defineType } from 'sanity';

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Industriehalle West, Köln"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lineup',
      title: 'Lineup',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Artist names, in running order',
    }),
    defineField({
      name: 'poster',
      title: 'Poster image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket link',
      type: 'url',
      description: 'Link to ticket.io (or other ticket provider). Leave empty for "Demnächst".',
    }),
    defineField({
      name: 'soldOut',
      title: 'Sold out',
      type: 'boolean',
      description: 'Overrides everything — shows "Sold Out" only.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'poster',
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString('de-DE') : undefined,
        media,
      };
    },
  },
});
