'use client';

import { useState } from 'react';

import Cropper, { Area } from 'react-easy-crop';

import getCroppedImg from '../lib/getCroppedImg';

interface ImageCropModalProps {
  imageSrc: string;
  fileName: string;
  onCropComplete: (file: File) => void;
  onClose: () => void;
}

const ImageCropModal = ({ imageSrc, fileName, onCropComplete, onClose }: ImageCropModalProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixelCrop, setPixelCrop] = useState<Area | null>(null);

  const handleCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setPixelCrop(croppedAreaPixels);
  };

  const handleConfirm = async () => {
    if (!pixelCrop) return;
    try {
      const croppedFile = await getCroppedImg(imageSrc, pixelCrop, fileName);
      onCropComplete(croppedFile);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative flex w-120 flex-col gap-6 rounded-2xl bg-[#191919] p-8">
        <div className="flex items-center justify-center">
          <h2 className="text-xl font-bold text-white">로고 이미지 규격 설정</h2>
        </div>

        <div className="relative h-96 w-full overflow-hidden rounded-xl bg-[#222222]">
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

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="min-w-14 text-base font-medium tracking-[-0.03rem] text-[#DDD]">
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
              className="h-1.5 w-80 cursor-pointer appearance-none rounded-lg [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              style={{
                background: `linear-gradient(to right, #FC335A 0%, #FC335A ${((zoom - 0.5) / (3 - 0.5)) * 100}%, #2F2F2F ${((zoom - 0.5) / (3 - 0.5)) * 100}%, #2F2F2F 100%)`,
              }}
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="cursor-pointer rounded-xl bg-[#2F2F2F] px-9 py-3 font-semibold text-white transition-colors hover:bg-[#3F3F3F]"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="cursor-pointer rounded-xl bg-[#FC335A] px-9 py-3 font-semibold text-white transition-colors hover:bg-[#FC335A]/90"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
