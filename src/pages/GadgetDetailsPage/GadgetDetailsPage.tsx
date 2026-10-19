import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { BackButton } from '@/components/atoms/BackButton';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Loader } from '@/components/atoms/Loader';
import { Typography } from '@/components/atoms/Typography';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import { ProductSpec } from '@/components/molecules/ProductSpec';
import { ProductGallery } from '@/components/organisms/ProductGallery';
import { ProductInfo } from '@/components/organisms/ProductInfo';
import { ProductsSlider } from '@/components/organisms/ProductsSlider';
import { useGadgetDetailsStore } from '@/stores/gadgetDetailsStore';
import { useProductsStore } from '@/stores/productsStore';
import type { Category } from '@/types/Products';
import { formatCapacity } from '@/utils/formatCapacity';

export const GadgetDetailsPage = () => {
  const { t, i18n } = useTranslation('', {
    keyPrefix: 'gadgetDetails',
  });

  const { category, itemId } = useParams();
  const navigate = useNavigate();

  const products = useProductsStore((state) => state.products);
  const sortedByCategory = useGadgetDetailsStore(
    (state) => state.gadgetsByCategory[category as Category],
  );
  const isProductsLoading = useProductsStore((state) => state.isLoading);
  const isGadgetsLoading = useGadgetDetailsStore((state) =>
    category ? state.loadingCategories.includes(category as Category) : false,
  );
  const gadgetError = useGadgetDetailsStore((state) =>
    category ? state.errors[category as Category] : undefined,
  );

  const fetchGadgets = useGadgetDetailsStore((state) => state.fetchGadgets);

  useEffect(() => {
    if (category) {
      fetchGadgets(category as Category);
    }
  }, [fetchGadgets, category]);

  if (!category || !itemId) {
    return <ErrorMessage message={t('invalidUrlError')} />;
  }
  if (isProductsLoading || isGadgetsLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (gadgetError) {
    return <ErrorMessage message={gadgetError} />;
  }

  const currentGadget = sortedByCategory?.find((model) => model.id === itemId);

  if (!currentGadget) {
    return <ErrorMessage message={t('notFoundError')} />;
  }

  const product = products.find((item) => item.itemId === itemId);
  const currentModelImgs = currentGadget?.images || [];

  const params = [
    { name: t('screen'), value: currentGadget.screen ?? '' },
    { name: t('resolution'), value: currentGadget.resolution ?? '' },
    { name: t('processor'), value: currentGadget.processor ?? '' },
    {
      name: t('ram'),
      value: formatCapacity(currentGadget.ram ?? '', i18n.language),
    },
    {
      name: t('builtInMemory'),
      value: formatCapacity(currentGadget.capacity ?? '', i18n.language),
    },
    { name: t('camera'), value: currentGadget.camera ?? '' },
    { name: t('zoom'), value: currentGadget.zoom ?? '' },
    { name: t('cell'), value: currentGadget.cell.join(', ') ?? '' },
  ];

  const filteredGadgetsByModel =
    currentGadget ?
      (sortedByCategory ?? []).filter(
        (model) => model.namespaceId === currentGadget.namespaceId,
      )
    : [];

  const navigateToVariant = (color: string, capacity: string) => {
    const nextGadget = filteredGadgetsByModel.find(
      (gadget) => gadget.color === color && gadget.capacity === capacity,
    );

    if (!nextGadget) {
      return;
    }

    navigate(`/product/${category}/${nextGadget.id}`);
  };

  const onColorChange = (newColor: string) => {
    navigateToVariant(newColor, currentGadget.capacity);
  };

  const onCapacityChange = (newCapacity: string) => {
    navigateToVariant(currentGadget.color, newCapacity);
  };

  return (
    <div className=" bg-[var(--hover)]">
      <div>
        <section className="container">
          <Breadcrumbs
            items={[
              { label: 'home', to: '/' },
              { label: category, to: `/catalog?category=${category}` },
              { label: currentGadget.name },
            ]}
            className="mb-6 tablet:mb-10"
          />

          <div className="mb-6 desktop:mb-4 ">
            <BackButton />
          </div>

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
        tablet:grid-cols-12 desktop:grid-cols-24 gap-4 tablet:gap-4 mb-14 tablet:mb-16 desktop:mb-20"
        >
          <div className="tablet:col-span-7 desktop:col-span-12 ">
            <ProductGallery images={currentModelImgs} />
          </div>

          <div className="tablet:col-span-5 desktop:col-span-11 desktop:col-start-14">
            <ProductInfo
              productId={product?.id}
              product={currentGadget}
              onColorChange={onColorChange}
              onCapacityChange={onCapacityChange}
            />
          </div>
        </section>

        <section className="container flex flex-col gap-14 tablet:gap-16 desktop:grid desktop:grid-cols-24 desktop:gap-x-0 mb-14 tablet:mb-16 desktop:mb-20">
          <div className=" min-w-0 desktop:col-span-12">
            <Typography
              variant="h3"
              as="h2"
              className="mb-4 font-bold tablet:font-extrabold"
            >
              {t('about')}
            </Typography>

            <div className="w-full mb-8 border-b border-elements" />

            <ul>
              {currentGadget.description.map((section) => (
                <li key={section.title}>
                  <Typography
                    variant="h4"
                    as="p"
                    className="mb-4 font-bold tablet:font-extrabold"
                  >
                    {section.title}
                  </Typography>

                  <Typography
                    variant="button"
                    as="p"
                    className="mb-8 desktop:font-medium text-text-secondary"
                  >
                    {section.text}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          <div className=" min-w-0 desktop:col-span-11 desktop:col-start-14">
            <Typography
              variant="h3"
              as="h2"
              className="mb-4 font-bold tablet:font-extrabold"
            >
              {t('techSpecs')}
            </Typography>

            <div className="w-full mb-7.5 tablet:mb-6.25 border-b border-elements" />
            <ProductSpec
              specs={params}
              nameVariant="body"
              valueVariant="button"
              nameWeight="font-medium"
              valueWeight="font-semibold"
            />
          </div>
        </section>
      </div>
      <section className="mb-14 tablet:mb-16 tablet-lg:mb-20">
        <div className="container py-7 tablet:py-8 desktop:py-10">
          <ProductsSlider
            title={t('alsoLikeTitle')}
            products={products}
          />
        </div>
      </section>
    </div>
  );
};
