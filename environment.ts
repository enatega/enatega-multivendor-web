export default function getEnv(){
    const MODE = process.env.NODE_ENV
    if(MODE==="production" || typeof window !== "undefined"){
      return {
         SERVER_URL : "https://enatega-multivendor.up.railway.app/",
         WS_SERVER_URL : "wss://enatega-multivendor.up.railway.app/",
      }
    }else{
        return {
            SERVER_URL : "http://localhost:8000/",
            WS_SERVER_URL : "ws://localhost:8000/",
         } 
    }
}