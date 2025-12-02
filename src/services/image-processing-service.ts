const TARGET_SIZE = 224;

function normalizeImageData(imageData: ImageData): number[][][] {
  const { data, width, height } = imageData;
  const normalized: number[][][] = [];

  for (let y = 0; y < height; y++) {
    const row: number[][] = [];
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx] / 255;
      const g = data[idx + 1] / 255;
      const b = data[idx + 2] / 255;
      row.push([r, g, b]);
    }
    normalized.push(row);
  }

  return normalized;
}

export async function processImage(file: File): Promise<number[][][]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target?.result as string;
    };

    img.onload = function () {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = TARGET_SIZE;
        canvas.height = TARGET_SIZE;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        const scale = Math.max(
          TARGET_SIZE / img.width,
          TARGET_SIZE / img.height,
        );
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (TARGET_SIZE - scaledWidth) / 2;
        const y = (TARGET_SIZE - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

        const imageData = ctx.getImageData(0, 0, TARGET_SIZE, TARGET_SIZE);
        const normalized = normalizeImageData(imageData);

        resolve(normalized);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = function () {
      reject(new Error("Failed to load image"));
    };

    reader.onerror = function () {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

export async function getImageDataUrl(file: File): Promise<string> {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = function (e) {

      resolve(e.target?.result as string);

    };

    reader.onerror = function () {

      reject(new Error("Failed to read file"));

    };

    reader.readAsDataURL(file);

  });

}



export async function getImageBase64(file: File): Promise<string> {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = function (e) {

      const dataUrl = e.target?.result as string;

      const base64 = dataUrl.split(",")[1];

      resolve(base64);

    };

    reader.onerror = function () {

      reject(new Error("Failed to read file"));

    };

    reader.readAsDataURL(file);

  });

}
