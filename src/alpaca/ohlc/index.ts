// import createClient from 'openapi-fetch';

// import type { paths } from '../../../types/alpaca/data';
// import { headers } from '../headers';
// import { baseUrl } from '../urls/data';
import { getBars } from './utils';

export async function run() {

  // const client = createClient<paths>({ baseUrl });

  const bars = await getBars('aapl', '1T', '2024-01-04T09:30:00', '2024-01-05T16:00:00');

  console.log(bars.length);
}
