import { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

export function useAssetLoader(imageUrls: string[] = [], sceneReady: boolean = false) {
  const { progress: modelProgress } = useProgress();
  const [imageProgress, setImageProgress] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setImageProgress(100);
      return;
    }

    let active = true;
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const onAssetLoad = () => {
      if (!active) return;
      loadedCount++;
      setImageProgress((loadedCount / totalImages) * 100);
    };

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = onAssetLoad;
      img.onerror = onAssetLoad;
    });

    return () => {
      active = false;
    };
  }, [imageUrls]);

  useEffect(() => {
    const targetProgress = (modelProgress + imageProgress) / 2;

    const roundedProgress = Math.round(targetProgress);

    setProgress(roundedProgress);

    if (roundedProgress >= 100 && sceneReady) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setLoaded(false);
    }
  }, [modelProgress, imageProgress, sceneReady]);

  return { progress, loaded };
}
