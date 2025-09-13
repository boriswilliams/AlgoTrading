import createClient from 'openapi-fetch';
import { DateTime } from 'luxon';

import type { paths, operations, components } from '../../../types/alpaca/data';
import { headers } from '../headers';
import { baseUrl } from '../urls/data';

export function date(localET: string) {
  return DateTime.fromISO(localET, { zone: 'America/New_York' }).toUTC().toISO({ suppressMilliseconds: true }) ?? undefined;
}

export async function getBars(
  ticker: string,
  timeframe: components["parameters"]["Timeframe"],
  startET: string,
  endET: string
) {
  
  const client = createClient<paths>({ baseUrl });

  const bars: components['schemas']['StockBar'][] = [];

  const query: operations['StockBars']['parameters']['query'] = {
    symbols: ticker.toLowerCase(),
    timeframe,
    start: date(startET),
    end: date(endET),
    adjustment: 'raw',
    feed: 'sip',
    sort: 'asc'
  };

  const options = {
    headers: {
      ...headers,
      accept: 'application/json'
    },
    params: {
      query
    }
  };

  while (await (async () => {
    const { data } = await client.GET('/v2/stocks/bars', options);

    bars.push(...(data?.bars[ticker.toUpperCase()] ?? []));
    
    if (!data?.next_page_token) return false;
    
    query.page_token = data?.next_page_token;
    return true;
  })());

  return bars;
}
