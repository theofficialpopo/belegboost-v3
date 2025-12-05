import { Suspense } from "react";
import SignIn from "@/components/auth/SignIn";

export const metadata = {
  title: "Anmelden - BelegBoost",
  description: "Melden Sie sich bei BelegBoost an.",
};

function LoginContent() {
  return <SignIn />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
