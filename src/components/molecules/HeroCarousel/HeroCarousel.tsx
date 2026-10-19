import { useEffect, useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/Carousel/carousel';

import type { HeroSlide } from './heroSlides';

type HeroCarouselProps = {
  slides: HeroSlide[];
  interval?: number;
};

type ProgressAnimationParams = {
  isCurrent: boolean;
  isPrev: boolean;
  interval: number;
};

const getProgressAnimation = ({
  isCurrent,
  isPrev,
  interval,
}: ProgressAnimationParams) => {
  if (isCurrent) {
    return `fill-progress ${interval}ms linear forwards`;
  }
  if (isPrev) {
    return 'fade-out-progress 700ms ease-out forwards';
  }
  return 'none';
};

export const HeroCarousel = ({
  slides,
  interval = 5000,
}: HeroCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [slideIndices, setSlideIndices] = useState({
    active: 0,
    previous: -1,
  });
  const { active: activeIndex, previous: prevIndex } = slideIndices;

  // Відстежуємо зміну активного слайда через API каруселі.
  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      const next = api.selectedScrollSnap();
      setSlideIndices((prev) =>
        prev.active === next ? prev : { active: next, previous: prev.active },
      );
    };

    handleSelect();

    api.on('select', handleSelect);
    api.on('reInit', handleSelect);

    return () => {
      api.off('select', handleSelect);
      api.off('reInit', handleSelect);
    };
  }, [api]);

  // Автоматично перемикаємо слайд після завершення інтервалу анімації.
  useEffect(() => {
    if (!api || slides.length < 2) {
      return;
    }

    const timer = setTimeout(() => {
      api.scrollNext();
    }, interval);

    return () => clearTimeout(timer);
  }, [api, activeIndex, interval, slides.length]);

  return (
    <div>
      <div className="group relative mx-auto w-full h-50 tablet:h-80 tablet-lg:h-100 desktop:h-140">
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className="w-full h-full"
        >
          <CarouselContent className="ml-0 h-full">
            {slides.map((slide) => (
              <CarouselItem
                key={slide.id}
                className="basis-full pl-0 h-full"
              >
                <div className="h-full w-full overflow-hidden rounded-lg">
                  <picture className="block h-full w-full">
                    {slide.image.mobile && (
                      <source
                        media="(max-width: 767px)"
                        srcSet={slide.image.mobile}
                        className="h-full"
                      />
                    )}

                    <img
                      src={slide.image.desktop}
                      alt={slide.alt}
                      className="h-full w-full object-cover"
                    />
                  </picture>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="pointer-events-none absolute inset-y-0 left-4 z-10 flex items-center opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
            <CarouselPrevious className="static translate-y-0 transition-transform active:translate-y-0 cursor-pointer" />
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-4 z-10 flex items-center opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
            <CarouselNext className="static translate-y-0 transition-transform active:translate-y-0 cursor-pointer" />
          </div>
        </Carousel>
      </div>

      {/* Показуємо прогрес кожного слайда: активний індикатор заповнюється, завершений зникає. */}
      {slides.length > 1 && (
        <div
          role="group"
          className="mt-3 flex w-full justify-center gap-2"
        >
          {slides.map((slide, index) => {
            const isCurrent = index === activeIndex;
            const isPrev = index === prevIndex;
            const isDone = !isCurrent && (index < activeIndex || isPrev);

            return (
              <div
                key={slide.id}
                className="h-1 w-3.5 shrink-0 overflow-hidden rounded-full bg-elements"
              >
                {/* key змінюється разом зі станом, щоб браузер перезапускав CSS-анімацію. */}
                <div
                  key={`${slide.id}-${isCurrent}-${isPrev}`}
                  className="h-full w-full origin-left bg-text"
                  style={{
                    transform:
                      isCurrent ? undefined : `scaleX(${isDone ? 1 : 0})`,
                    opacity: isDone && !isPrev ? 0 : 1,
                    animation: getProgressAnimation({
                      isCurrent,
                      isPrev,
                      interval,
                    }),
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
