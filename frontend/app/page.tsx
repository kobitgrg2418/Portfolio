import HomeClient from "@/components/HomeClient";
import { getPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getPortfolio();
  return <HomeClient data={data} />;
}
