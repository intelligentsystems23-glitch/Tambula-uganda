/**
 * Utility for client-side image compression, optimization, and conversion to base64 Data URLs.
 * Keeps document payloads compact (< 200KB) for fast Firestore synchronization and instant loading.
 */

export interface OptimizedImageResult {
  dataUrl: string;
  originalName: string;
  originalSizeKB: number;
  optimizedSizeKB: number;
  width: number;
  height: number;
}

export async function optimizeImageFile(
  file: File,
  maxDimension = 800,
  quality = 0.82
): Promise<OptimizedImageResult> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Please select a valid image file (JPEG, PNG, WebP, etc.).'));
    }

    const originalSizeKB = Math.round(file.size / 1024);

    // Read the file as DataURL
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to process image format.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaled dimensions while preserving aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Could not initialize canvas context for image optimization.'));
        }

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);

        // Try webp first, fallback to jpeg if unsupported
        let dataUrl: string;
        try {
          dataUrl = canvas.toDataURL('image/webp', quality);
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }
        } catch {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Calculate approximate byte size of base64 data
        const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const optimizedSizeKB = Math.round((base64Length * 3) / 4 / 1024);

        resolve({
          dataUrl,
          originalName: file.name,
          originalSizeKB,
          optimizedSizeKB,
          width,
          height,
        });
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
