// src/collections/CostCodes.ts
import type { CollectionConfig } from 'payload';

const CostCodes: CollectionConfig = {
  slug: 'costcodes',
  labels: { singular: 'Cost Code', plural: 'Cost Codes' },
  admin: {
    useAsTitle: 'label',
  },
  access: {
    create: () => true,
    read:   () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'value', type: 'text', required: true },
  ],
}

export default CostCodes
