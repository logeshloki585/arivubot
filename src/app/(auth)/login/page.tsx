import LoginPage from "@/components/common/login";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function Login() {
  return <LoginPage></LoginPage>;
}
