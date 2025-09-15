import createClient from 'openapi-fetch';
import { DateTime } from 'luxon';

import type { paths, components } from '../../../../types/alpaca/data';
import { headers } from '../../headers';
import { baseUrl } from '../../urls/data';
import { EXCHANGE } from '../../values';

export function date(localET: string) {
  return DateTime.fromISO(localET, { zone: 'America/New_York' }).toUTC().toISO({ suppressMilliseconds: true }) ?? undefined;
}

type ReturnTypes = {
  '/v2/stocks/bars': components['schemas']['StockBar'];
  '/v1beta3/crypto/{loc}/bars': components['schemas']['CryptoBar'];
}

async function getPages<P extends keyof ReturnTypes>(endpoint: P, ticker: string, params: paths[P]['get']['parameters']) {

  const options = {
    headers: {
      ...headers,
      accept: 'application/json'
    },
    params
  };
  
  const client = createClient<paths>({ baseUrl });

  const bars: ReturnTypes[P][] = [];

  while (await (async () => {
    const { data } = await client.GET(endpoint, options as any);

    bars.push(...(data?.bars[ticker.toUpperCase()] ?? []));
    
    if (!data?.next_page_token) return false;
    
    options.params.query.page_token = data?.next_page_token;
    return true;
  })());

  return bars;
}

export async function getStockBars(
  ticker: string,
  timeframe: components['parameters']['Timeframe'],
  startET: string,
  endET: string
): Promise<components['schemas']['StockBar'][]> {

  return await getPages('/v2/stocks/bars', ticker,
    {
      query: {
        symbols: ticker.toLowerCase(),
        timeframe,
        start: date(startET),
        end: date(endET),
        adjustment: 'raw',
        feed: EXCHANGE,
        sort: 'asc'
      }
    }
  );
}

export async function getCryptoBars(
  ticker: string,
  timeframe: components['parameters']['Timeframe'],
  startET: string,
  endET: string
): Promise<components['schemas']['CryptoBar'][]> {

  return await getPages('/v1beta3/crypto/{loc}/bars', ticker,
    {
      path: {
        loc: 'us'
      },
      query: {
        symbols: ticker.toLowerCase(),
        timeframe,
        start: date(startET),
        end: date(endET),
        sort: 'asc'
      }
    }
  );
}
