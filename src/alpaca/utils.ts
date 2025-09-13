import { readCert } from '../utils/readCert';

export function makeHeaders(key: string, secret: string) {
  return {
    'APCA-API-KEY-ID': readCert(`alpaca/${key}`),
    'APCA-API-SECRET-KEY': readCert(`alpaca/${secret}`)
  }
};
