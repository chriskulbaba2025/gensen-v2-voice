'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Gauge, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <nav className="flex justify-between items-center px-[40px] py-[20px] border-b border-[#00000020] bg-white z-50">
      {/* Logo → external dashboard */}
      <a
        href="https://gensen-client-portal2.vercel.app/dashboard/welcome"
        className="flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="https://responsegenerators.ca/wp-content/uploads/2025/07/Gensen-Logo-Final-version-lower-case-logo-and-spaces1.webp"
          alt="Gensen Logo"
          width={40}
          height={40}
          className="cursor-pointer rounded-[8px]"
        />
        <span className="ml-[40px] text-[24px] font-semibold text-black">
          GENSEN
        </span>
      </a>

      {/* Nav Items */}
      <div className="flex items-center space-x-[40px]">
        <NavItem
          href="https://gensen-client-portal2.vercel.app/dashboard/welcome"
          label="Dashboard"
          Icon={Gauge}
          external
        />
        <NavItem href="/" label="Brand Voice" Icon={Gauge} />
        <NavItem
          href="https://gensen-map-builder.vercel.app/"
          label="Topical Map"
          Icon={Gauge}
          external
        />
        <NavItem
          href="https://gensen-client-portal2.vercel.app/generate/step-1"
          label="Content Generator"
          Icon={Gauge}
          external
        />
        <NavItem onClick={handleLogout} label="Logout" Icon={LogOut} />
      </div>
    </nav>
  );
}

type NavItemProps = {
  href?: string;
  onClick?: () => void;
  label: string;
  Icon: React.ComponentType<{ size: number }>;
  external?: boolean;
};

function NavItem({ href, onClick, label, Icon, external = false }: NavItemProps) {
  const content = (
    <>
      <Icon size={18} />
      <span className="nav-hover">{label}</span>
      <style jsx>{`
        .nav-hover {
          position: relative;
        }
        .nav-hover::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -2px;
          transform: translateX(-50%) scaleX(0);
          transform-origin: center;
          width: 100%;
          height: 2px;
          background-color: #f66630;
          transition: transform 0.3s ease-in-out;
        }
        .nav-hover:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
      `}</style>
    </>
  );

  const commonClasses =
    'flex items-center gap-[8px] text-[16px] font-medium text-black transition relative';

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={commonClasses}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={commonClasses}
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${commonClasses} bg-transparent border-none p-0 focus:outline-none`}
      style={{ color: 'inherit', background: 'none' }}
    >
      {content}
    </button>
  );
}
