export async function img64Converter(img: File | FileList): Promise<string> {
  if (img) {
    const file = img instanceof FileList ? img[0] : img;
    if (
      (file && file instanceof File && file.name === '') ||
      (file && file instanceof FileList && !file.length) ||
      !file
    )
      return '';
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
