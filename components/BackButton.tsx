'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="back-button visible"
      onClick={() => router.back()}
    >
      ←
    </button>
  );
}
