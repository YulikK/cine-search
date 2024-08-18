export async function img64Converter(img: File[] | string): Promise<string> {
  if (img && img.length > 0 && img[0] instanceof File) {
    const file = img[0];
    try {
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          if (typeof result === 'string') {
            const base64String = result; //.split(',')[1];
            resolve(base64String);
          } else {
            resolve('');
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      return base64String;
    } catch (error) {
      console.error('Error converting image:', error);
      return '';
    }
  }
  return '';
}
