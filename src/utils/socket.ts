import { io } from 'socket.io-client';
import { getApiUrl } from './helpers';

const apiurl = getApiUrl();
const baseurl = new URL(apiurl).origin;

export const socket = io(baseurl);
