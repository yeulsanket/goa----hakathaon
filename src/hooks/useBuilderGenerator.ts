import { useState, useCallback } from 'react';
import type { AppState, BuilderData, Format } from '../types/builder';
import { getRandomTitle, generateBuilderId } from '../lib/builderTitles';
import { processImageFile } from '../lib/imageProcessor';

export function useBuilderGenerator() {
  const [state, setState] = useState<AppState>('IDLE');
  const [error, setError] = useState<string | null>(null);
  
  const [data, setData] = useState<BuilderData>({
    image: null,
    format: 'BUILDER_ID',
    name: '',
    stack: '',
    location: '',
    title: getRandomTitle(),
    energy: 'SHIPPER',
    builderId: generateBuilderId(),
    twitter: '',
    github: '',
    linkedin: '',
    instagram: '',
    quote: '',
  });

  const handleUpload = useCallback(async (file: File) => {
    try {
      setState('UPLOADING');
      setError(null);
      const dataUrl = await processImageFile(file);
      setData((prev) => ({ ...prev, image: dataUrl }));
      setState('PHOTO_READY');
    } catch (err: any) {
      setError(err.message || 'THE FRAME HIT A BUG.');
      setState('ERROR');
    }
  }, []);

  const proceedToConfigure = useCallback((format: Format) => {
    setData((prev) => ({ ...prev, format }));
    setState('CONFIGURING');
  }, []);

  const updateData = useCallback((updates: Partial<BuilderData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const generate = useCallback(() => {
    setState('GENERATING');
    // Simulate generation time (500-1200ms) for wow effect
    setTimeout(() => {
      setState('RESULT');
    }, 800);
  }, []);

  const reset = useCallback((keepPhoto: boolean) => {
    if (keepPhoto) {
      setData((prev) => ({
        ...prev,
        title: getRandomTitle(),
        builderId: generateBuilderId(),
      }));
      setState('PHOTO_READY');
    } else {
      setData({
        image: null,
        format: 'BUILDER_ID',
        name: '',
        stack: '',
        location: '',
        title: getRandomTitle(),
        energy: 'SHIPPER',
        builderId: generateBuilderId(),
        twitter: '',
        github: '',
        linkedin: '',
        instagram: '',
        quote: '',
      });
      setError(null);
      setState('IDLE');
    }
  }, []);

  return {
    state,
    error,
    data,
    handleUpload,
    proceedToConfigure,
    updateData,
    generate,
    reset,
    setState,
  };
}
