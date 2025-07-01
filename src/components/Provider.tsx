"use client";
import { PaymentProvider } from "./context/PaymentPageContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PaymentProvider>{children}</PaymentProvider>
  );
}