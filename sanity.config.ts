'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool, type StructureResolver } from 'sanity/structure';

import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schemaTypes';

// Events are split into Upcoming / Past so older events don't get in the way.
// (The Studio splits at the start time; the website keeps an event under
// "upcoming" until 06:00 the morning after.)
const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Events')
        .schemaType('event')
        .child(
          S.list()
            .title('Events')
            .items([
              S.listItem()
                .title('Upcoming')
                .schemaType('event')
                .child(
                  S.documentTypeList('event')
                    .title('Upcoming events')
                    .apiVersion(apiVersion)
                    .filter('_type == "event" && date >= now()')
                    .defaultOrdering([{ field: 'date', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Past')
                .schemaType('event')
                .child(
                  S.documentTypeList('event')
                    .title('Past events')
                    .apiVersion(apiVersion)
                    .filter('_type == "event" && date < now()')
                    .defaultOrdering([{ field: 'date', direction: 'desc' }]),
                ),
            ]),
        ),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'event'),
    ]);

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
