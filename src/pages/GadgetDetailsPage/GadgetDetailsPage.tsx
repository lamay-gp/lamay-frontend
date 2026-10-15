import { useEffect, useState } from 'react';

import { ColorSelectorRadio } from '@/components/atoms/ColorSelectorRadio';
import { useGadgetDetailsStore } from '@/stores/gadgetDetailsStore';
import type { Gadget } from '@/types/Products';

type Props = {
  gadget: Gadget;
};

export const GadgetDetailsPage = ({ gadget }: Props) => {
  const sortedByCategory = useGadgetDetailsStore(
    (state) => state.gadgetsByCategory[gadget.category],
  );

  const fetchGadgets = useGadgetDetailsStore((state) => state.fetchGadgets);

  const filteredGadgetsByModel = (sortedByCategory ?? []).filter(
    (model) => model.namespaceId === gadget.namespaceId,
  );
  const [currentColor, setCurrentColor] = useState(gadget.color);

  const onColorChange = (newColor: string) => setCurrentColor(newColor);

  console.log(filteredGadgetsByModel);

  useEffect(() => {
    fetchGadgets(gadget.category);
  }, [fetchGadgets, gadget.category]);

  const selectedGadget = filteredGadgetsByModel.find(
    (model) => model.color === currentColor,
  );

  const currentModelImgs = selectedGadget?.images ?? gadget.images;

  console.log(currentModelImgs);

  return (
    <div>
      Gadget details page
      <ColorSelectorRadio
        currentColor={currentColor}
        colorRange={gadget.colorsAvailable}
        onClick={onColorChange}
      />
    </div>
  );
};
