// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

import Projects from './collections/Projects'
import CostCodes from './collections/CostCodes'
import SubCategories from './collections/SubCategories'
import Budgets from './collections/Budgets'
import Expenses from './collections/Expenses'
import Rates from './collections/Rates'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects, CostCodes, SubCategories, Budgets, Expenses, Rates],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
 email: nodemailerAdapter({
    defaultFromName:    'ControlDeObra',             // nombre que verá el destinatario
    defaultFromAddress: 'ingfabiandutra@gmail.com',    // dirección “From”
    transportOptions: {
      host:   process.env.SMTP_HOST!,
      port:   Number(process.env.SMTP_PORT!),
      secure: process.env.SMTP_SECURE === 'true',     // true para TLS
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    },
  })
})
