// src/collections/Budgets.ts
import type { CollectionConfig, CollectionSlug } from 'payload'
import { NumberField } from '@nouance/payload-better-fields-plugin/Number'

const Budgets: CollectionConfig = {
  slug: 'budgets',
  labels: { singular: 'Budget Line', plural: 'Budget Lines' },
  access: {
    create: () => true,
    read:   () => true,
    update: () => true,
    delete: () => true,
  },
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
    ...NumberField(
      { name: 'amountUSD', label: 'Amount (USD)', required: true },
      {
        thousandSeparator: '.',
        decimalSeparator: ',',
        decimalScale: 2,
        fixedDecimalScale: true,
      }
    ),
    ...NumberField(
      { name: 'amountUYU', label: 'Amount (UYU)', required: true },
      {
        thousandSeparator: '.',
        decimalSeparator: ',',
        decimalScale: 2,
        fixedDecimalScale: true,
      }
    ),
  ],
}

export default Budgets
