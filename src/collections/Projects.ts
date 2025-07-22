// src/collections/Projects.ts
import type { CollectionConfig } from 'payload'
import { NumberField } from '@nouance/payload-better-fields-plugin/Number'

const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural:   'Projects',
  },
  admin: {
    useAsTitle: 'name',
  },
  auth: false,
  access: {
    create: () => true,
    read:   () => true,
    update: () => true,
    delete: () => true,
  },
  timestamps: true,
  fields: [
    { name: 'name',            type: 'text', required: true },
    { name: 'address',         type: 'text' },
    { name: 'contact',         type: 'text' },
    // Budget USD with formatting
    ...NumberField(
      { name: 'budgetUSD', label: 'Budget (USD)', required: true },
      {
        thousandSeparator: '.',
        decimalSeparator: ',',
        decimalScale: 2,
        fixedDecimalScale: true,
      }
    ),
    // Budget UYU with formatting
    ...NumberField(
      { name: 'budgetUYU', label: 'Budget (UYU)', required: true },
      {
        thousandSeparator: '.',
        decimalSeparator: ',',
        decimalScale: 2,
        fixedDecimalScale: true,
      }
    ),
    // Contingency % with formatting (no decimals or maybe one)
    ...NumberField(
      { name: 'contingencyPct', label: 'Contingency (%)', required: true },
      {
        thousandSeparator: '',
        decimalSeparator: '.',
        decimalScale: 2,
        fixedDecimalScale: true,
        suffix: '%',
      }
    ),
  ],
}

export default Projects
