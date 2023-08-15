
export const connection_config = {
  url: import.meta.env.VITE_REACT_APP_MQTT_BROKER_URL,
  options: {
    keepalive: 30,
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed anormally..!',
      qos: 0,
      retain: false,
    },
  
    clientId: 'randomclient',

  },
};
     //rejectUnauthorized: true,
    //requestCert: true,
    // username: import.meta.env.VITE_REACT_APP_BROKER_AUTH_USER_NAME,
    // password: import.meta.env.VITE_REACT_APP_BROKER_AUTH_PASSWORD,
    // ca: [fs.readFileSync(import.meta.env.VITE_SSL_CA_CERT)],
    // cert: fs.readFileSync(import.meta.env.VITE_SSL_SERVER_CERT),
    // key: fs.readFileSync(import.meta.env.VITE_SSL_SERVER_KEY),