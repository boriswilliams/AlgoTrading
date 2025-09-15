// import createClient from 'openapi-fetch';

// import type { paths } from '../../../types/alpaca/data';
// import { headers } from '../headers';
// import { baseUrl } from '../urls/data';
import { getCryptoBars, getStockBars } from './get/historical';
import { getCryptoBar } from './get/latest';

export async function run() {

  // const client = createClient<paths>({ baseUrl });

  // const bars = await getStockBars('aapl', '1D', '2025-01-04T09:30:00', '2025-09-14T16:00:00');
  // const bars = await getCryptoBars('BTC/USD', '1D', '2025-01-04T09:30:00', '2025-09-14T16:00:00');
  const bar = await getCryptoBar('BTC/USD');

  console.log(bar);
}
