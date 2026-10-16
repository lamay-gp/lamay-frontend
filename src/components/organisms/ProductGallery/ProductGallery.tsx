import { useState } from 'react';

import { ImageZoom } from '@/components/kibo-ui/image-zoom';

const IMAGES_BASE_URL =
  'https://raw.githubusercontent.com/superpooperxxx/mate-group-project/master/public/gadgets';

type Props = {
  images: string[];
};

export const ProductGallery = ({ images }: Props) => {
  const [selection, setSelection] = useState({
    firstImage: images[0],
    selectedImage: images[0],
  });

  const selectedImage =
    selection.firstImage === images[0] ? selection.selectedImage : images[0];

  const handleImageSelect = (image: string) => {
    setSelection({
      firstImage: images[0],
      selectedImage: image,
    });
  };
  return (
    <div className=" grid tablet:grid-cols-7 tablet:col-start-2 desktop:grid-cols-12  desktop:col-start-3 gap-4  mb-10 tablet:mb-16 desktop:mb-20">
      <div className="tablet:col-span-6 desktop:col-span-10">
        <ImageZoom>
          <img
            src={`${IMAGES_BASE_URL}/${selectedImage}`}
            alt="Product"
            className="aspect-square w-full object-contain"
          />
        </ImageZoom>
      </div>

      <div
        className="flex flex-row gap-2 tablet:flex-col tablet:col-start-1
      tablet:row-start-1 desktop:gap-4 shrink-0 overflow-hidden tablet:h-auto tablet:col-span-1 desktop:col-span-2 desktop:col-start-1  "
      >
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => handleImageSelect(image)}
            aria-label="Show product image"
            aria-pressed={selectedImage === image}
            className={` h-12.25 w-12.75 rounded-[4px] shrink-0 overflow-hidden cursor-pointer desktop:rounded-2 border hover:border-text tablet:aspect-square tablet:h-auto tablet:w-full ${
              selectedImage === image ? 'border-text' : 'border-elements'
            }`}
          >
            <img
              src={`${IMAGES_BASE_URL}/${image}`}
              alt="Product small"
              className="size-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
