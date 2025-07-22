import type { CollectionConfig, CollectionSlug } from 'payload';

const SubCategories: CollectionConfig = {
  slug: 'subcategories',
  labels: { singular: 'SubCategory', plural: 'SubCategories' },
  admin: {
    useAsTitle: 'name',
  },
  access: { create: () => true, read: () => true, update: () => true, delete: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'costCode',
      type: 'relationship',
      relationTo: 'costcodes' as unknown as CollectionSlug,
      required: true,
    },
  ],
};

export default SubCategories;
