export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function processImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error("BIG PHOTO. BIGGER THAN WE NEED."));
      return;
    }

    // Very basic check for supported types
    // Note: HEIC/HEIF support directly in browser is limited without a library like heic2any.
    // If the browser supports it, the File API will handle it natively when read as DataURL.
    // We will just try reading it and let it fail gracefully if unsupported.
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error("Failed to process image"));
      }
    };
    reader.onerror = () => {
      reject(new Error("THE FRAME HIT A BUG."));
    };

    reader.readAsDataURL(file);
  });
}
