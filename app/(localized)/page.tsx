import dynamic from "next/dynamic";

const Home = dynamic(
  () => import('@/lib/ui/screens/unprotected/index'),
  { ssr: false }
);

export default function RootPage() {

  return <Home/>
}
