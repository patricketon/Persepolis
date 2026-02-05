import { Suspense } from "react";
import AuthCompleteClient from "./AuthCompleteClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AuthCompleteClient />
    </Suspense>
  );
}