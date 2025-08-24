'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <div>
      <Image
        onClick={() => router.push('/')}
        alt="Logo"
        className="hidden md:block cursor-pointer"
        width={100}
        height={100}
        priority
        src="/logo.svg"
      />
    </div>
  );
};

export default Logo;
