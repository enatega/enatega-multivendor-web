export default function getEnv(env: "DEV" | "PROD") {
  if (env === "PROD" || typeof window === "undefined") {
    return {
      // SERVER_URL: "https://enatega-multivendor-revamp.up.railway.app/",
      // WS_SERVER_URL: "wss://enatega-multivendor-revamp.up.railway.app/",
      SERVER_URL: "https://enatega-multivendor.up.railway.app/graphql",
      WS_SERVER_URL: "wss://enatega-multivendor.up.railway.app/",
    };
  } else {
    return {
      SERVER_URL: "http://192.168.0.141:8001/",
      WS_SERVER_URL: "ws://192.168.0.141:8001/",
    };
  }
}
