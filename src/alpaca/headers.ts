import { readCert } from '../utils/readCert';

export const headers = {
  'APCA-API-KEY-ID': readCert('alpaca/key'),
  'APCA-API-SECRET-KEY': readCert('alpaca/secret')
}
