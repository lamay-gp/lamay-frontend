export const formatCapacity = (capacity: string, currentLanguage: string) => {
  if (!capacity) return '';

  if (currentLanguage === 'uk') {
    return capacity
      .replace(/TB/gi, 'ТБ')
      .replace(/GB/gi, 'ГБ')
      .replace(/MB/gi, 'МБ')
      .replace(/mm/gi, 'мм');
  }

  return capacity;
};
