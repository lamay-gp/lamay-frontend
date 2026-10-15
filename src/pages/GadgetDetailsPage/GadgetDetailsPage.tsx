import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ColorSelectorRadio } from '@/components/atoms/ColorSelectorRadio';
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

  const currentGadget = sortedByCategory?.find((model) => model.id === itemId);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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

  console.log(filteredGadgetsByModel);

  const selectedGadget = filteredGadgetsByModel.find(
    (model) => model.color === currentColor,
  );

  const currentModelImgs = selectedGadget?.images ?? currentGadget?.images;

  console.log(currentModelImgs);

  return (
    <div>
      Gadget details page
      <ColorSelectorRadio
        currentColor={currentColor || ''}
        colorRange={currentGadget?.colorsAvailable || []}
        onClick={onColorChange}
      />
    </div>
  );
};
