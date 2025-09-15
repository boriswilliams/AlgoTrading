import createClient from 'openapi-fetch';

import type { paths, components, operations } from '../../../../types/alpaca/data';
import { headers } from '../../headers';
import { baseUrl } from '../../urls/data';

export async function getCryptoBar(
  ticker: string,
): Promise<components['schemas']['CryptoBar'] | undefined> {

  const params: operations['CryptoLatestBars']['parameters'] = {
    path: {
      loc: 'us'
    },
    query: {
      symbols: ticker,
    }
  };

  const options = {
    headers: {
      ...headers,
      accept: 'application/json'
    },
    params
  };
  
  const client = createClient<paths>({ baseUrl });

  const { data } = await client.GET('/v1beta3/crypto/{loc}/latest/bars', options);

  return data?.bars[ticker.toUpperCase()];
}
