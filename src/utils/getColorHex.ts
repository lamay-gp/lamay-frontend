import { COLORS } from '@/constants/colors';

const FALLBACK = '#CCCCCC';

export const normalizeColor = (color: string) =>
  color.toLowerCase().replace(/[\s-]/g, '');

export const getColorHex = (color: string): string =>
  COLORS[normalizeColor(color)] ?? FALLBACK;
