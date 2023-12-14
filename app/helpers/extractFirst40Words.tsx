export const extractFirst40Words = (content:string) => {
    const words = content.split(' ');
    const first40Words = words.slice(0, 40).join(' ');
    return first40Words;
  };