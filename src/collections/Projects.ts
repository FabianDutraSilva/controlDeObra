// src/collections/Projects.ts
import type { CollectionConfig } from 'payload';

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
    { name: 'name',    type: 'text',   required: true },
    { name: 'address', type: 'text' },
    { name: 'contact', type: 'text' },
    { name: 'budgetUSD',   type: 'number' },
    { name: 'budgetUYU',   type: 'number' },
    { name: 'contingencyPct', type: 'number' },
  ],
};

export default Projects;
