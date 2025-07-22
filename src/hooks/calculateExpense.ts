import type { CollectionBeforeChangeHook, CollectionSlug } from 'payload'
import fetch from 'node-fetch'

export const calculateExpenseHook: CollectionBeforeChangeHook = async ({
  data, req, operation, originalDoc,
}) => {
  // recalcular sólo cuando importe
  if (
    operation === 'update' &&
    data.amountOriginal === undefined &&
    data.currency === undefined
  ) return data

  let rateUYU = 0

  /* 1️⃣ INTENTO: API externa */
  try {
    const res  = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=UYU')
    const json = (await res.json()) as { rates?: { UYU: number } }
    rateUYU    = json.rates?.UYU ?? 0
  } catch (e) {
    console.error('API rate error:', e)
  }

  /* 2️⃣ Fallback local si la API no respondió o devolvió 0 */
  if (!rateUYU || rateUYU < 1) {
    const result = await req.payload.find({
      collection: 'rates' as unknown as CollectionSlug,
      sort: '-updatedAt',
      limit: 1,
    }) as { docs: { rateUYU?: number }[] }

    rateUYU = result.docs[0]?.rateUYU ?? 0
  }

  /* 3️⃣ Si seguimos sin tasa válida -> error explícito */
  if (!rateUYU || rateUYU < 1) {
    throw new Error('No valid FX rate (USD→UYU) available. Add one to the Rates collection.')
  }

  /* 4️⃣ Conversión */
  const rateUSD   = data.currency === 'USD' ? 1 : 1 / rateUYU
  const raw       = data.amountOriginal ?? originalDoc?.amountOriginal ?? 0
  const amount    = typeof raw === 'string'
      ? parseFloat(raw.replace(/\./g, '').replace(',', '.')) // “2.000,00” → 2000
      : raw
  const amountUSD = +(amount * rateUSD).toFixed(2)

  return { ...data, rateUSD, amountUSD }
}
