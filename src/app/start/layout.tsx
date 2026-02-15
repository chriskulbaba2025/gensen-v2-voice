import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwt } from "jose";

export default async function StartLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gensen_session")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded: any = decodeJwt(token);

    if (!decoded?.sub) {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }

  return <>{children}</>;
}
