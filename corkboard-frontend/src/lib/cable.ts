import {createConsumer} from "@rails/actioncable"
const WS_URL = import.meta.env.VITE_WS_URL;
export const cable = createConsumer(WS_URL);