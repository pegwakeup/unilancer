import React, { useEffect, useRef } from 'react';
import '@google/model-viewer';

interface ModelViewerProps {
  src: string;
  alt?: string;
  ar?: boolean;
  arModes?: string;
  arScale?: string;
  cameraControls?: boolean;
  autoRotate?: boolean;
  shadowIntensity?: number;
  environmentImage?: string;
  exposure?: number;
  className?: string;
  poster?: string;
  loading?: 'auto' | 'lazy' | 'eager';
  reveal?: 'auto' | 'interaction' | 'manual';
  skyboxImage?: string;
  toneMapping?: string;
  shadowSoftness?: number;
  materialColor?: string;
  onLoad?: () => void;
  onError?: (error: any) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean;
          'ar-modes'?: string;
          'ar-scale'?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          'shadow-intensity'?: number;
          'environment-image'?: string;
          exposure?: number;
          poster?: string;
          loading?: 'auto' | 'lazy' | 'eager';
          reveal?: 'auto' | 'interaction' | 'manual';
          'skybox-image'?: string;
          'tone-mapping'?: string;
          'shadow-softness'?: number;
        },
        HTMLElement
      >;
    }
  }
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  src,
  alt = '3D Model',
  ar = false,
  arModes = 'webxr scene-viewer quick-look',
  arScale = 'auto',
  cameraControls = true,
  autoRotate = false,
  shadowIntensity = 1,
  environmentImage = 'neutral',
  exposure = 1,
  className = '',
  poster,
  loading = 'auto',
  reveal = 'auto',
  skyboxImage = 'neutral',
  toneMapping = 'commerce',
  shadowSoftness = 1,
  materialColor,
  onLoad,
  onError,
}) => {
  const modelViewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;

    if (modelViewer) {
      const handleLoad = () => {
        if (onLoad) onLoad();
      };

      const handleError = (event: any) => {
        if (onError) onError(event);
      };

      modelViewer.addEventListener('load', handleLoad);
      modelViewer.addEventListener('error', handleError);

      return () => {
        modelViewer.removeEventListener('load', handleLoad);
        modelViewer.removeEventListener('error', handleError);
      };
    }
  }, [onLoad, onError]);

  return (
    <model-viewer
      ref={modelViewerRef as any}
      src={src}
      alt={alt}
      ar={ar}
      ar-modes={arModes}
      ar-scale={arScale}
      camera-controls={cameraControls}
      auto-rotate={autoRotate}
      shadow-intensity={shadowIntensity}
      environment-image={environmentImage}
      exposure={exposure}
      poster={poster}
      loading={loading}
      reveal={reveal}
      skybox-image={skyboxImage}
      tone-mapping={toneMapping}
      shadow-softness={shadowSoftness}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
      }}
    />
  );
};

export default ModelViewer;
