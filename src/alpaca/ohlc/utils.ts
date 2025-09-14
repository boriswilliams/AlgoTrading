import createClient from 'openapi-fetch';
import { DateTime } from 'luxon';

import type { paths, operations, components } from '../../../types/alpaca/data';
import { headers } from '../headers';
import { baseUrl } from '../urls/data';
import { EXCHANGE } from '@src/values';

export function date(localET: string) {
  return DateTime.fromISO(localET, { zone: 'America/New_York' }).toUTC().toISO({ suppressMilliseconds: true }) ?? undefined;
}

export async function getStockBars(
  ticker: string,
  timeframe: components["parameters"]["Timeframe"],
  startET: string,
  endET: string
): Promise<components['schemas']['StockBar'][]> {
  
  const client = createClient<paths>({ baseUrl });

  const query: operations['StockBars']['parameters']['query'] = {
    symbols: ticker.toLowerCase(),
    timeframe,
    start: date(startET),
    end: date(endET),
    adjustment: 'raw',
    feed: EXCHANGE,
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

  const bars: components['schemas']['StockBar'][] = [];

  while (await (async () => {
    const { data } = await client.GET('/v2/stocks/bars', options);

    bars.push(...(data?.bars[ticker.toUpperCase()] ?? []));
    
    if (!data?.next_page_token) return false;
    
    query.page_token = data?.next_page_token;
    return true;
  })());

  return bars;
}

export async function getCryptoBars(
  ticker: string,
  timeframe: components["parameters"]["Timeframe"],
  startET: string,
  endET: string
): Promise<components['schemas']['CryptoBar'][]> {
  
  const client = createClient<paths>({ baseUrl });

  const path: operations['CryptoBars']['parameters']['path'] = {
    loc: 'us'
  };

  const query: operations['CryptoBars']['parameters']['query'] = {
    symbols: ticker.toLowerCase(),
    timeframe,
    start: date(startET),
    end: date(endET),
    sort: 'asc'
  };

  const options = {
    headers: {
      ...headers,
      accept: 'application/json'
    },
    params: {
      path,
      query
    }
  };

  const bars: components['schemas']['CryptoBar'][] = [];

  while (await (async () => {
    const { data } = await client.GET('/v1beta3/crypto/{loc}/bars', options);

    bars.push(...(data?.bars[ticker.toUpperCase()] ?? []));
    
    if (!data?.next_page_token) return false;
    
    query.page_token = data?.next_page_token;
    return true;
  })());

  return bars;
}
