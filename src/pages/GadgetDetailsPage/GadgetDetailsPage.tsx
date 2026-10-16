//import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Typography } from '@/components/atoms/Typography';
import { ProductGallery } from '@/components/organisms/ProductGallery';
import { ProductInfo } from '@/components/organisms/ProductInfo';
//import { ProductsSlider } from '@/components/organisms/ProductsSlider';
import { useGadgetDetailsStore } from '@/stores/gadgetDetailsStore';
import type { Category } from '@/types/Products';

export const GadgetDetailsPage = () => {
  const { category, itemId } = useParams();
  const navigate = useNavigate();

  const sortedByCategory = useGadgetDetailsStore(
    (state) => state.gadgetsByCategory[category as Category],
  );

  const fetchGadgets = useGadgetDetailsStore((state) => state.fetchGadgets);

  useEffect(() => {
    if (category) {
      fetchGadgets(category as Category);
    }
  }, [fetchGadgets, category]);

  // const [isLoading, setIsLoading] = useState(true);
  const currentGadget = sortedByCategory?.find((model) => model.id === itemId);
  if (!currentGadget) {
    return <ErrorMessage message="Gadget not found" />;
  }
  const currentModelImgs = currentGadget?.images || [];

  const filteredGadgetsByModel =
    currentGadget ?
      (sortedByCategory ?? []).filter(
        (model) => model.namespaceId === currentGadget.namespaceId,
      )
    : [];

  const onColorChange = (newColor: string) => {
    const nextGadget = filteredGadgetsByModel.find(
      (gadget) => gadget.color === newColor,
    );

    if (!nextGadget) {
      return <ErrorMessage message="Gadget not found" />;
    }

    navigate(`/product/${category}/${nextGadget.id}`);
  };

  if (!category || !itemId) {
    return <ErrorMessage message="Invalid product URL" />;
  }

  return (
    <div>
      <div>
        <section className="container">
          {/* <Breadcrumbs />

        <BackButton />*/}
          <Typography
            variant="h2"
            as="h1"
            className="mb-6 tablet:mb-8 desktop:mb-10"
          >
            {currentGadget?.name}
          </Typography>
        </section>

        <section
          className="container grid grid-cols-1
        tablet:grid-cols-12 desktop:grid-cols-24 gap-4 tablet:gap-4.25 desktop:gap-16"
        >
          <div className="tablet:col-span-7 desktop:col-span-12 ">
            <ProductGallery images={currentModelImgs} />
          </div>

          <div className="tablet:col-span-5 desktop:col-span-12">
            <ProductInfo
              product={currentGadget}
              onColorChange={onColorChange}
            />
          </div>
        </section>

        <section className="container flex flex-col gap-14 tablet:gap-16 desktop:gap-16 tablet:flex-row">
          <div></div>

          <div></div>
        </section>
      </div>
      {/*<ProductsSlider
        title="You may also like"
        products={filteredGadgetsByModel}
      />*/}
    </div>
  );
};

/*http://localhost:5173/product/phones/apple-iphone-11-128gb-black*/

/*
https://github.com/superpooperxxx/mate-group-project/blob/master/public/gadgets/img/phones/apple-iphone-11/black/00.webp

"img/phones/apple-iphone-11/black/00.webp",*/
