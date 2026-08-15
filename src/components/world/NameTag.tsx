'use client';

import { useEffect, useState } from 'react';
import { CanvasTexture, NearestFilter, SRGBColorSpace } from 'three';

const SCALE = 24;
const PAD_X = 10;
const PAD_Y = 6;

function makeTexture(text: string, family: string): { texture: CanvasTexture; aspect: number } {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const font = `${SCALE}px ${family}`;
  ctx.font = font;
  const width = Math.ceil(ctx.measureText(text).width) + PAD_X * 2;
  const height = SCALE + PAD_Y * 2;
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.fillRect(0, 0, width, height);
  ctx.font = font;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, PAD_X, height / 2 + 2);
  const texture = new CanvasTexture(canvas);
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  texture.colorSpace = SRGBColorSpace;
  return { texture, aspect: width / height };
}

export default function NameTag({ text, position }: { text: string; position: [number, number, number] }) {
  const [tex, setTex] = useState<{ texture: CanvasTexture; aspect: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const family = getComputedStyle(document.documentElement).getPropertyValue('--font-minecraft').trim() || 'monospace';
    document.fonts
      .load(`${SCALE}px ${family}`)
      .catch(() => undefined)
      .then(() => {
        if (!cancelled) setTex(makeTexture(text, family));
      });
    return () => {
      cancelled = true;
    };
  }, [text]);

  useEffect(() => () => tex?.texture.dispose(), [tex]);

  if (!tex) return null;
  const h = 0.32;
  return (
    <sprite position={position} scale={[h * tex.aspect, h, 1]}>
      <spriteMaterial map={tex.texture} transparent depthWrite={false} toneMapped={false} />
    </sprite>
  );
}
