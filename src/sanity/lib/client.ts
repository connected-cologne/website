import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Public dataset, published content only — no token needed.
  useCdn: true,
});
