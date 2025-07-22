// src/collections/Expenses.ts
import type { CollectionConfig, CollectionSlug } from 'payload'
import { NumberField } from '@nouance/payload-better-fields-plugin/Number'
import { calculateExpenseHook } from '../hooks/calculateExpense'

const Expenses: CollectionConfig = {
  slug: 'expenses',
  labels: { singular: 'Expense', plural: 'Expenses' },
  admin: { useAsTitle: 'invoiceNumber' },
  access: {
    create: ({ req }) => Boolean(req.user),
    read:   ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  timestamps: true,
  fields: [
    { name: 'project',     type: 'relationship', relationTo: 'projects'      as unknown as CollectionSlug, required: true },
    { name: 'costCode',    type: 'relationship', relationTo: 'costcodes'     as unknown as CollectionSlug, required: true },
    { name: 'subCategory', type: 'relationship', relationTo: 'subcategories' as unknown as CollectionSlug },
    { name: 'invoiceNumber', type: 'text', label: 'Invoice Number', required: true },

    // Monto original (moneda de la factura)
    ...NumberField(
      { name: 'amountOriginal', label: 'Amount Original', required: true },
      { thousandSeparator: '.', decimalSeparator: ',', decimalScale: 2, fixedDecimalScale: true },
    ),

    { name: 'currency', type: 'select', label: 'Currency', options: ['USD', 'UYU'], defaultValue: 'UYU', required: true },

    // Campos calculados por el hook
    ...NumberField(
      { name: 'rateUSD', label: 'Rate USD', admin: { readOnly: true } },
      { thousandSeparator: '.', decimalSeparator: ',', decimalScale: 4, fixedDecimalScale: true },
    ),
    ...NumberField(
      { name: 'amountUSD', label: 'Amount USD', admin: { readOnly: true } },
      { thousandSeparator: '.', decimalSeparator: ',', decimalScale: 2, fixedDecimalScale: true },
    ),

    // IVA
    ...NumberField(
      { name: 'ivaPct', label: 'IVA (%)', required: true },
      { thousandSeparator: '', decimalSeparator: ',', decimalScale: 2, fixedDecimalScale: true },
    ),

    { name: 'providerName',   type: 'text', label: 'Provider Name'  },
    { name: 'providerTaxId',  type: 'text', label: 'Provider Tax ID' },
    { name: 'invoiceDate',    type: 'date', label: 'Invoice Date'   },
    { name: 'dueDate',        type: 'date', label: 'Due Date'       },
    { name: 'paidDate',       type: 'date', label: 'Paid Date'      },

    {
      name: 'attachment',
      type: 'upload',
      relationTo: 'media' as unknown as CollectionSlug,
      required: true,
      admin: { description: 'PDF o PNG ≤ 1 MB' },
    },
  ],
  hooks: {
    beforeChange: [calculateExpenseHook],
  },
}

export default Expenses
