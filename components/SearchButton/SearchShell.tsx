import { Suspense } from "react";
import Search from "./Search";

export default function SearchShell(props: {
  placeholder: string;
  className?: string;
  iconColor?: "white" | "black";
}) {
  return (
    <Suspense fallback={null}>
      <Search {...props} />
    </Suspense>
  );
}