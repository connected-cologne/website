import type { SchemaTypeDefinition } from 'sanity';

import { eventType } from './event';
import { releaseType } from './release';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, releaseType],
};
