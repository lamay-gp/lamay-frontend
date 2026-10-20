import type { Product } from '@/types/Products';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char];
  });

export const createProductsHtml = (products: Product[]) => {
  const imagesBaseUrl = import.meta.env.VITE_GADGETS_URL;

  return products
    .map((product) => {
      const imageUrl = `${imagesBaseUrl}/${product.image}`;

      return `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #eeeeef;">
            <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
            >
              <tr>
                <td width="64" valign="middle" style="width:64px;padding-right:12px;">
                  <img
                    src="${escapeHtml(imageUrl)}"
                    alt="${escapeHtml(product.name)}"
                    width="64"
                    height="64"
                    style="display:block;width:64px;height:64px;object-fit:contain;border:0;"
                  >
                </td>

                <td valign="middle">
                  <p style="margin:0 0 5px;color:#27272a;font-size:14px;font-weight:700;line-height:1.4;">
                    ${escapeHtml(product.name)}
                  </p>

                  <p style="margin:0;color:#71717a;font-size:12px;line-height:1.6;">
                    ${escapeHtml(product.capacity)} ·
                    ${escapeHtml(product.ram)}
                  </p>
                </td>

                <td width="110" align="right" valign="middle" style="width:110px;padding-left:8px;color:#27272a;font-size:13px;font-weight:700;white-space:nowrap;">
                  ${product.price.toLocaleString('en-US')} USD
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    })
    .join('');
};
