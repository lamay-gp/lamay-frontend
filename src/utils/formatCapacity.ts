export const formatCapacity = (capacity: string, currentLanguage: string) => {
  if (!capacity) return '';

  if (currentLanguage === 'uk') {
    return capacity.replace(/GB/gi, 'ГБ').replace(/TB/gi, 'ТБ');
  }

  return capacity;
};
