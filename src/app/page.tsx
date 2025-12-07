// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  return redirect("https://portal.omnipressence.com/dashboard/brand-voice");
}
