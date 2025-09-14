// import createClient from 'openapi-fetch';

// import type { paths } from '../../../types/alpaca/data';
// import { headers } from '../headers';
// import { baseUrl } from '../urls/data';
import { getCryptoBars, getStockBars } from './utils';

export async function run() {

  // const client = createClient<paths>({ baseUrl });

  // const bars = await getStockBars('aapl', '1D', '2024-01-04T09:30:00', '2025-09-14T16:00:00');
  const bars = await getCryptoBars('BTC/USD', '1D', '2024-01-04T09:30:00', '2025-09-14T16:00:00');

  console.log(bars);
}
