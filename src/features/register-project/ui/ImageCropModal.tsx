'use client';

import { useState } from 'react';

import Cropper, { Area, MediaSize, Point } from 'react-easy-crop';
import { toast } from 'sonner';

import { cn } from '@/shared/utils';

import { getCroppedImg } from '../lib/getCroppedImg';

const LOGO_CROP_SIZE = 280;
const DEFAULT_MIN_ZOOM = 0.5;
const DEFAULT_MAX_ZOOM = 3;

interface ImageCropModalProps {
  imageSrc: string;
  fileName: string;
  fileType: string;
  onCropComplete: (file: File) => void;
  onClose: () => void;
}

const ImageCropModal = ({
  imageSrc,
  fileName,
  fileType,
  onCropComplete,
  onClose,
}: ImageCropModalProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [minZoom, setMinZoom] = useState<number>(DEFAULT_MIN_ZOOM);
  const [maxZoom, setMaxZoom] = useState<number>(DEFAULT_MAX_ZOOM);
  const [pixelCrop, setPixelCrop] = useState<Area | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setPixelCrop(croppedAreaPixels);
  };

  const handleMediaLoaded = (mediaSize: MediaSize) => {
    const shorterSide = Math.min(mediaSize.width, mediaSize.height);
    if (shorterSide <= 0) return;

    const initialZoom = LOGO_CROP_SIZE / shorterSide;

    setMinZoom(initialZoom * 0.5);
    setMaxZoom(initialZoom * 1.5);
    setZoom(initialZoom);
  };

  const handleConfirm = async () => {
    if (!pixelCrop || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const croppedFile = await getCroppedImg(imageSrc, pixelCrop, fileName, fileType);
      onCropComplete(croppedFile);
      onClose();
    } catch {
      toast.error('이미지를 처리하는 중 오류가 발생했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  const zoomProgress = ((zoom - minZoom) / (maxZoom - minZoom)) * 100;

  return (
    <div
      className={cn(
        'flex w-full max-w-120 flex-col items-center gap-y-6 rounded-xl border border-[#2F2F2F] bg-[rgba(34,34,34,0.5)] p-6 backdrop-blur-[18px]',
        isSubmitting && 'cursor-wait',
      )}
    >
      <h2 className={cn('text-xl font-semibold tracking-[-0.0375rem] text-white')}>
        로고 이미지 규격 설정
      </h2>

      <div
        className={cn('relative h-108 w-full overflow-hidden rounded-xl border border-[#2F2F2F]')}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          cropSize={{ width: LOGO_CROP_SIZE, height: LOGO_CROP_SIZE }}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
          onMediaLoaded={handleMediaLoaded}
          minZoom={minZoom}
          maxZoom={maxZoom}
        />
      </div>

      <div className={cn('flex items-center gap-4')}>
        <span className={cn('min-w-14 text-base font-medium tracking-[-0.03rem] text-[#DDD]')}>
          확대/축소
        </span>
        <input
          type="range"
          value={zoom}
          min={minZoom}
          max={maxZoom}
          step={0.01}
          aria-labelledby="Zoom"
          onChange={(e) => setZoom(Number(e.target.value))}
          className={cn(
            'h-1.5 w-80 cursor-pointer appearance-none rounded-lg [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white',
          )}
          style={{
            background: `linear-gradient(to right, #FC335A 0%, #FC335A ${zoomProgress}%, #2F2F2F ${zoomProgress}%, #2F2F2F 100%)`,
          }}
          disabled={isSubmitting}
        />
      </div>

      <div className={cn('flex justify-between')}>
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className={cn(
            'flex cursor-pointer items-center justify-center rounded-[1.125rem] border border-[#FC335A] px-9 py-3 text-base font-semibold text-[#FC335A]',
            isSubmitting && 'opacity-50',
          )}
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isSubmitting}
          className={cn(
            'flex cursor-pointer items-center justify-center rounded-xl bg-[#FC335A] px-9 py-3 font-semibold text-white transition-colors hover:bg-[#FC335A]/90',
            isSubmitting && 'opacity-50',
          )}
        >
          {isSubmitting ? '크롭 중' : '확인'}
        </button>
      </div>
    </div>
  );
};

export default ImageCropModal;
