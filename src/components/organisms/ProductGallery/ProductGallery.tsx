const IMAGES_BASE_URL =
  'https://raw.githubusercontent.com/superpooperxxx/mate-group-project/master/public/gadgets';

type Props = {
  images: string[];
};

export const ProductGallery = ({ images }: Props) => {
  return (
    <img
      className="mb-4 aspect-square w-full object-cover"
      src={`${IMAGES_BASE_URL}/${images[1]}`}
      alt="Product"
    />
  );
};
/*
https://github.com/superpooperxxx/mate-group-project/blob/master/public/gadgets/img/phones/apple-iphone-11/black/00.webp

"img/phones/apple-iphone-11/black/00.webp",*/
