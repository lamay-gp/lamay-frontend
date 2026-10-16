//import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ColorSelectorRadio } from '@/components/atoms/ColorSelectorRadio';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Typography } from '@/components/atoms/Typography';
import { ProductGallery } from '@/components/organisms/ProductGallery';
//import { ProductInfo } from '@/components/organisms/ProductInfo';
//import { ProductsSlider } from '@/components/organisms/ProductsSlider';
import { useGadgetDetailsStore } from '@/stores/gadgetDetailsStore';
import type { Category } from '@/types/Products';

export const GadgetDetailsPage = () => {
  const { category, itemId } = useParams();

  const sortedByCategory = useGadgetDetailsStore(
    (state) => state.gadgetsByCategory[category as Category],
  );

  const fetchGadgets = useGadgetDetailsStore((state) => state.fetchGadgets);

  useEffect(() => {
    if (category) {
      fetchGadgets(category as Category);
    }
  }, [fetchGadgets, category]);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const currentGadget = sortedByCategory?.find((model) => model.id === itemId);

  const currentColor = selectedColor ?? currentGadget?.color ?? '';

  const filteredGadgetsByModel =
    currentGadget ?
      (sortedByCategory ?? []).filter(
        (model) => model.namespaceId === currentGadget.namespaceId,
      )
    : [];

  const onColorChange = (newColor: string) => {
    setSelectedColor(newColor);
  };

  const selectedGadget = filteredGadgetsByModel.find(
    (model) => model.color === currentColor,
  );
  if (!category || !itemId) {
    return <ErrorMessage message="Invalid product URL" />;
  }

  if (!selectedGadget) {
    return <ErrorMessage message="Gadget not found" />;
  }
  const currentModelImgs = selectedGadget?.images ?? currentGadget?.images;

  console.log(currentModelImgs);

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
            {selectedGadget?.name}
          </Typography>
        </section>

        <section className="container flex flex-col gap-4 tablet:gap-[17px] desktop:gap-16 tablet:flex-row">
          <div>
            <ProductGallery images={currentModelImgs} />
          </div>
          <div>
            {/*<ProductInfo product={selectedGadget} />*/}
            <ColorSelectorRadio
              currentColor={currentColor || ''}
              colorRange={currentGadget?.colorsAvailable || []}
              onClick={onColorChange}
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
