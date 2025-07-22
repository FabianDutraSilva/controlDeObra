// src/collections/Expenses.ts
import type { CollectionConfig, CollectionSlug } from 'payload';

const Expenses: CollectionConfig = {
  slug: 'expenses',
  labels: { singular: 'Expense', plural: 'Expenses' },
  access: {
    create: ({ req }) => Boolean(req.user),
    read:   ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  timestamps: true,
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
    {
      name: 'subCategory',
      type: 'relationship',
      relationTo: 'subcategories' as unknown as CollectionSlug,
    },
    { name: 'invoiceNumber', type: 'text', required: true },
    { name: 'amountOriginal', type: 'number', required: true },
    {
      name: 'currency',
      type: 'select',
      options: ['USD', 'UYU'],
      defaultValue: 'UYU',
    },
    { name: 'rateUSD',    type: 'number', admin: { readOnly: true } },
    { name: 'amountUSD',  type: 'number', admin: { readOnly: true } },
    { name: 'ivaPct',     type: 'number', defaultValue: 22 },
    { name: 'providerName', type: 'text' },
    { name: 'providerTaxId', type: 'text' },
    { name: 'invoiceDate', type: 'date' },
    { name: 'dueDate',     type: 'date' },
    { name: 'paidDate',    type: 'date' },
    {
      name: 'attachment',
      type: 'upload',
      relationTo: 'media' as unknown as CollectionSlug,
      required: true,
      admin: { description: 'PDF or PNG ≤ 1 MB' },
    },
  ],
};

export default Expenses;
