export async function compressImageToBase64(file: File): Promise<string> {
  const image = await loadImage(file);
  const maxEdge = 800;
  const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas is unavailable in this browser.');
  }

  context.drawImage(image, 0, 0, width, height);
  const base64 = canvas.toDataURL('image/jpeg', 0.7);
  
  // Validate base64 size (5MB limit for IndexedDB safety)
  const sizeInBytes = base64.length * 0.75; // Rough conversion from base64 to bytes
  const maxSizeBytes = 5 * 1024 * 1024;
  
  if (sizeInBytes > maxSizeBytes) {
    throw new Error(`Image too large (${Math.round(sizeInBytes / 1024 / 1024)}MB). Please use a smaller image.`);
  }
  
  return base64;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('The selected image could not be read.'));
    };
    image.src = url;
  });
}
