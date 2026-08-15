import type { Metadata } from 'next';
import WorldClient from '@/components/world/WorldClient';

export const metadata: Metadata = {
  title: 'world | kryo.dev',
  description: 'Walk around a voxel hub and explore my projects',
};

export default function WorldPage() {
  return <WorldClient />;
}
