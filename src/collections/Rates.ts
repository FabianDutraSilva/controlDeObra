// src/collections/Rates.ts
import type { CollectionConfig } from 'payload'

const Rates: CollectionConfig = {
  slug: 'rates',
  labels: { singular: 'Rate', plural: 'Rates' },
  access: { create: () => true, read: () => true },
  fields: [
    { name: 'rateUYU', type: 'number', label: 'UYU per USD', required: true },
  ],
}

export default Rates
