import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        category: z.enum([
          'fiscal', 'finance', 'registry', 'stats', 'geo', 'health',
          'transport', 'justice', 'identity', 'gov', 'opendata',
          'procurement', 'elections', 'regulators',
          'banks', 'payments', 'couriers', 'telecom', 'marketplaces',
          'sms', 'invoicing', 'maps', 'jobs', 'energy', 'insurance',
          'aggregator', 'community',
        ]).optional(),
        institution: z.string().optional(),
        country: z.string().default('RO').optional(),
        status: z.enum(['active', 'stale', 'broken', 'suspended', 'gated']).optional(),
        verified_at: z.coerce.string().optional(),
        auth: z.string().optional(),
        protocol: z.string().optional(),
        openapi_spec: z.union([z.boolean(), z.literal('partial')]).optional(),
        sandbox_available: z.boolean().optional(),
        contract_required: z.boolean().optional(),
        pricing: z.string().optional(),
        rate_limit: z.string().optional(),
        official_docs: z.string().optional(),
        api_base_url: z.string().optional(),
        last_known_version: z.string().optional(),
        mandatory_for_business: z.boolean().optional(),
      }),
    }),
  }),
};
