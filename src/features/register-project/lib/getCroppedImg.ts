export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

export interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  fileName: string,
  fileType: string,
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    -pixelCrop.x,
    -pixelCrop.y,
    image.width,
    image.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      const file = new File([blob], fileName, { type: fileType });
      resolve(file);
    }, fileType);
  });
}
