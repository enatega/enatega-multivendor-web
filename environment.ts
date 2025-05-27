export default function getEnv(env: "DEV" | "PROD") {
  if (env === "PROD" || typeof window === "undefined") {
    return {
     SERVER_URL: "https://v1-api-enatega-multivendor-stage.up.railway.app/",
      WS_SERVER_URL: "wss://v1-api-enatega-multivendor-stage.up.railway.app/",
    };
  } else {
    return {
      SERVER_URL: "http://localhost:8001/",
      WS_SERVER_URL: "ws://localhost:8001/",
    };
  }
}
