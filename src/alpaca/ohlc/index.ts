import createClient from 'openapi-fetch';
import { DateTime } from 'luxon';

import type { paths } from '../../../types/alpaca/data';
import { headers } from '../headers';
import { baseUrl } from '../urls/data';

function date(localET: string) {
  return DateTime.fromISO(localET, { zone: 'America/New_York' }).toUTC().toISO({ suppressMilliseconds: true }) ?? undefined;
}

export async function run() {

  const client = createClient<paths>({ baseUrl });

  const { data, error, response } = await client.GET('/v2/stocks/bars', {
    headers: {
      ...headers,
      accept: 'application/json'
    },
    params: {
      query: {
        symbols: 'aapl',
        timeframe: '30T',
        start: date('2024-01-04T09:30:00'),
        end: date('2024-01-04T16:00:00'),
        adjustment: 'raw',
        feed: 'sip',
        sort: 'asc'
      }
    }
  });

  console.log(data?.bars);
}
