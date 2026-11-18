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
      description: 'e.g. "Industriehalle West, Cologne"',
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
    defineField({
      name: 'recapUrl',
      title: 'Recap link',
      type: 'url',
      description:
        'Optional. Link to an Instagram post or reel from the night. Shown as a "Recap" button once the event is over. Leave empty to show nothing.',
    }),
    defineField({
      name: 'showInPast',
      title: 'Show in past events',
      type: 'boolean',
      description:
        'Once the event is over (06:00 the morning after), it moves to "Past Events" on the website. Switch off to hide it there.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'poster',
      showInPast: 'showInPast',
    },
    prepare({ title, date, media, showInPast }) {
      const day = date ? new Date(date).toLocaleDateString('de-DE') : undefined;
      return {
        title,
        subtitle: showInPast === false ? [day, 'hidden from past events'].filter(Boolean).join(' · ') : day,
        media,
      };
    },
  },
});
