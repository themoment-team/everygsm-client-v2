'use client';

import { useState } from 'react';

import Cropper, { Area, Point } from 'react-easy-crop';

import { cn } from '@/shared/utils';

import getCroppedImg from '../lib/getCroppedImg';

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
  const [pixelCrop, setPixelCrop] = useState<Area | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setPixelCrop(croppedAreaPixels);
  };

  const handleConfirm = async () => {
    if (!pixelCrop || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const croppedFile = await getCroppedImg(imageSrc, pixelCrop, fileName, fileType);
      onCropComplete(croppedFile);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm',
        isSubmitting && 'cursor-wait',
      )}
    >
      <div className={cn('relative flex w-120 flex-col gap-6 rounded-2xl bg-[#191919] p-8')}>
        <div className={cn('flex items-center justify-center')}>
          <h2 className={cn('text-xl font-bold text-white')}>로고 이미지 규격 설정</h2>
        </div>

        <div className={cn('relative h-96 w-full overflow-hidden rounded-xl bg-[#222222]')}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
            minZoom={0.5}
            showGrid={false}
            restrictPosition={false}
          />
        </div>

        <div className={cn('flex items-center gap-4')}>
          <span className={cn('min-w-14 text-base font-medium tracking-[-0.03rem] text-[#DDD]')}>
            확대/축소
          </span>
          <input
            type="range"
            value={zoom}
            min={0.5}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className={cn(
              'h-1.5 w-80 cursor-pointer appearance-none rounded-lg [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white',
            )}
            style={{
              background: `linear-gradient(to right, #FC335A 0%, #FC335A ${((zoom - 0.5) / (3 - 0.5)) * 100}%, #2F2F2F ${((zoom - 0.5) / (3 - 0.5)) * 100}%, #2F2F2F 100%)`,
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
    </div>
  );
};

export default ImageCropModal;
