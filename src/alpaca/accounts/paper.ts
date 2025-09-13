import { makeHeaders } from '../utils';

export const baseUrl = 'https://paper-api.alpaca.markets/'

export const headers = makeHeaders('paper/key', 'paper/secret');
