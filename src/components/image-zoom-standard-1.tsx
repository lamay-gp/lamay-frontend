'use client';

import { ImageZoom } from '@/components/kibo-ui/image-zoom';

export const title = 'Click to zoom';

const Example = () => (
  <ImageZoom>
    <img
      alt="Product"
      className="w-full max-w-md rounded-lg border"
      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
    />
  </ImageZoom>
);

export default Example;
