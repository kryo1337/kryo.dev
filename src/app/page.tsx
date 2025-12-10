import type { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: 'kryo.dev',
  description: 'kryo portfolio',
};

export default function Home() {
  return <HomeContent />;
}
