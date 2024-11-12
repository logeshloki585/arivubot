import DummyComponent from "@/components/common/home";
import UserPage from "@/components/common/HomePage";
import { getUser } from "@/lib/auth";

export default async function Home() {
  const session = await getUser();
  return <>{session ? <UserPage></UserPage> : <DummyComponent />}</>;
}
