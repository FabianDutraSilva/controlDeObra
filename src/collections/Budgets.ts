import type { CollectionConfig, CollectionSlug } from 'payload';

const Budgets: CollectionConfig = {
  slug: 'budgets',
  labels: { singular: 'Budget Line', plural: 'Budget Lines' },
  access: { create: () => true, read: () => true, update: () => true, delete: () => true },
  fields: [
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects' as unknown as CollectionSlug,
      required: true,
    },
    {
      name: 'costCode',
      type: 'relationship',
      relationTo: 'costcodes' as unknown as CollectionSlug,
      required: true,
    },
    { name: 'amountUSD', type: 'number', required: true },
    { name: 'amountUYU', type: 'number', required: true },
  ],
};

export default Budgets;
