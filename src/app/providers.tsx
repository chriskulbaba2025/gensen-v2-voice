"use client";

import { FormProvider } from "@/context/FormContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormProvider>{children}</FormProvider>;
}
