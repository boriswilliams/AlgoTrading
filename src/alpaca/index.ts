import createClient from 'openapi-fetch';

import type { paths, components } from '../../types/alpaca/trading';
import { headers } from './headers';
import { baseUrl } from './urls/trading/paper';

export async function run() {

  const client = createClient<paths>({ baseUrl });

  const { data: accountData, error, response } = await client.GET('/v2/account', {
    headers
  });

  console.log(accountData);
  console.error(error);
  console.debug(response);

  const { data: assetData } = await client.GET('/v2/assets', {
    headers
  });
  
  console.log(assetData);
}
