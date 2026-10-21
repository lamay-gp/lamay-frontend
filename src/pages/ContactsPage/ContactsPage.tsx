import { useTranslation } from 'react-i18next';

import { Typography } from '@/components/atoms/Typography';

export const ContactsPage = () => {
  const { t } = useTranslation('', { keyPrefix: 'contactPage' });
  const teamMembers = [
    {
      name: t('nameYaroslav'),
      role: t('roleYaroslav'),
      image: 'avatars/Yaroslav.webp',
      github: 'https://github.com/bakugan228',
      rotate: '-rotate-3',
      position:
        'desktop:col-start-1 desktop:row-start-1 desktop:translate-y-12',
    },
    {
      name: t('nameLena'),
      role: t('roleLena'),
      image: 'avatars/Lena.webp',
      github: 'https://github.com/olenabokhan1121',
      rotate: 'rotate-2',
      position:
        'desktop:col-start-3 desktop:row-start-1 desktop:translate-y-12',
    },
    {
      name: t('nameAnton'),
      role: t('roleAnton'),
      image: 'avatars/Anton.webp',
      github: 'https://github.com/AchekcSs',
      rotate: '-rotate-2',
      position: 'desktop:col-start-2 desktop:row-start-2',
    },
    {
      name: t('nameAnna'),
      role: t('roleAnna'),
      image: 'avatars/Anna.webp',
      github: 'https://github.com/annavas03',
      rotate: 'rotate-3',
      position:
        'desktop:col-start-1 desktop:row-start-3 desktop:-translate-y-12',
    },
    {
      name: t('nameMaksym'),
      role: t('roleMaksym'),
      image: 'avatars/Max.webp',
      github: 'https://github.com/YatskuliakMa',
      rotate: '-rotate-2',
      position:
        'tablet:col-span-2 tablet:justify-self-center desktop:col-start-3 desktop:row-start-3 desktop:-translate-y-12',
    },
  ];

  return (
    <section className="container bg-hover py-10">
      <Typography
        variant="h1"
        as="h1"
        className="mb-10 desktop:mb-0 text-center text-button font-semibold"
      >
        LAMAY STUDIO
      </Typography>

      <div className="grid grid-cols-1 items-center gap-x-8 gap-y-12 px-4 desktop:px-30 tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-x-0 desktop:gap-y-0">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className={`mx-auto w-full max-w-60 ${member.position}`}
          >
            <div
              className={`overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105 ${member.rotate}`}
            >
              <img
                src={`${import.meta.env.BASE_URL}${member.image}`}
                alt={member.name}
                className="aspect-4/5 w-full object-cover"
              />

              <div className="p-4 text-center">
                <Typography
                  variant="h3"
                  as="h2"
                  className="mb-2"
                >
                  {member.name}
                </Typography>

                <p className="mb-4 text-sm text-(--color-text-secondary)">
                  {member.role}
                </p>

                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-button transition-colors hover:underline"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Typography
        variant="h1"
        as="p"
        className="mb-1 text-center text-button font-bold"
      >
        {t('meet')}
      </Typography>

      <Typography
        variant="h2"
        as="p"
        className="mb-10 text-center text-button font-normal"
      >
        {t('titleLine1')}
        <br />
        {t('titleLine2')}
      </Typography>
    </section>
  );
};
