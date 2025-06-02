'use client'
import dynamic from "next/dynamic";

const Home = dynamic(
  () => import('@/lib/ui/screens/unprotected/index'),
  { ssr: false }
);

export default function RootPage() {

  // if ('serviceWorker' in navigator) {
  //   window.addEventListener('load', () => {
  //     navigator.serviceWorker.register('/sw.js')
  //       .then(registration => {
  //         console.log('Service Worker registered with scope:', registration.scope);
  //       })
  //       .catch(error => {
  //         console.error('Service Worker registration failed:', error);
  //       });
  //   });
  // }

  return <Home/>
}
