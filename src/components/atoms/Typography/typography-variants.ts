export type TypographyVariant =
  'h1' | 'h2' | 'h3' | 'h4' | 'uppercase' | 'button' | 'body' | 'small';

export const variantClasses: Record<TypographyVariant, string> = {
  h1: 'font-bold text-[32px] leading-[41px] tracking-[-0.01em] tablet:text-[48px] tablet:leading-[56px]',
  h2: 'font-bold text-[22px] leading-[31px] tracking-[0] tablet:text-[32px] tablet:leading-[41px] tablet:tracking-[-0.01em]',
  h3: 'font-semibold text-[20px] leading-[26px] tracking-[0] tablet:font-bold tablet:text-[22px] tablet:leading-[31px]',
  h4: 'font-semibold text-[16px] leading-[20px] tracking-[0] tablet:text-[20px] tablet:leading-[26px]',
  uppercase: 'font-bold text-[12px] leading-[11px] tracking-[0.04em] uppercase',
  button: 'font-semibold text-[14px] leading-[21px] tracking-[0]',
  body: 'font-normal text-[14px] leading-[21px] tracking-[0]',
  small: 'font-semibold text-[12px] leading-[15px] tracking-[0]',
};
