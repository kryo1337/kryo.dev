'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import WorldLoader from './WorldLoader';

const World = dynamic(() => import('./World'), {
  ssr: false,
  loading: () => <WorldLoader />,
});

let mediaQuery: MediaQueryList | null = null;
const getMediaQuery = () => (mediaQuery ??= window.matchMedia('(pointer: coarse), (max-width: 767px)'));

const subscribe = (onChange: () => void) => {
  const query = getMediaQuery();
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

export default function WorldClient() {
  const isMobile = useSyncExternalStore<boolean | null>(
    subscribe,
    () => getMediaQuery().matches,
    () => null
  );

  if (isMobile === null) {
    return <WorldLoader />;
  }

  if (isMobile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0e0d12] p-6">
        <div className="w-full max-w-sm bg-[#2a2933] border-4 border-black shadow-[inset_2px_2px_0_rgba(255,255,255,0.15),inset_-2px_-2px_0_rgba(0,0,0,0.5)] p-8 text-center space-y-6">
          <h1 className="font-minecraft text-lg text-mauve [text-shadow:3px_3px_0_rgba(0,0,0,0.6)]">
            kryo&apos;s world
          </h1>
          <p className="font-minecraft text-[10px] text-white/80 leading-relaxed">
            This world needs a keyboard and mouse. Come back on a desktop!
          </p>
          <Link
            href="/"
            className="inline-block font-minecraft px-6 py-2.5 text-xs text-white bg-[#727272] hover:bg-[#8a8a9e] border-2 border-black shadow-[inset_-2px_-4px_0_rgba(0,0,0,0.4),inset_2px_2px_0_rgba(255,255,255,0.35)] [text-shadow:2px_2px_0_rgba(0,0,0,0.5)]"
          >
            back to kryo.dev
          </Link>
        </div>
      </div>
    );
  }

  return <World />;
}
