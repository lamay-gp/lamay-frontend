import { Typography } from '@/components/atoms/Typography';

const teamMembers = [
  {
    name: 'Yaroslav',
    role: 'Creative Developer',
    image: 'avatars/Yaroslav.webp',
    github: 'https://github.com/bakugan228',
    rotate: '-rotate-3',
    position: 'desktop:col-start-1 desktop:row-start-1 desktop:translate-y-12',
  },
  {
    name: 'Lena',
    role: 'Project Manager',
    image: 'avatars/Lena.webp',
    github: 'https://github.com/olenabokhan1121',
    rotate: 'rotate-2',
    position: 'desktop:col-start-3 desktop:row-start-1 desktop:translate-y-12',
  },
  {
    name: 'Anton',
    role: 'Tech Lead',
    image: 'avatars/Anton.webp',
    github: 'https://github.com/AchekcSs',
    rotate: '-rotate-2',
    position: 'desktop:col-start-2 desktop:row-start-2',
  },
  {
    name: 'Anna',
    role: 'Redesign Developer',
    image: 'avatars/Anna.webp',
    github: 'https://github.com/annavas03',
    rotate: 'rotate-3',
    position: 'desktop:col-start-1 desktop:row-start-3 desktop:-translate-y-12',
  },
  {
    name: 'Maksym',
    role: 'Features Developer',
    image: 'avatars/Max.webp',
    github: 'https://github.com/YatskuliakMa',
    rotate: '-rotate-2',
    position:
      'tablet:col-span-2 tablet:justify-self-center desktop:col-start-3 desktop:row-start-3 desktop:-translate-y-12',
  },
];
export const ContactsPage = () => {
  return (
    <section className="container bg-hover py-10">
      <Typography
        variant="h2"
        as="h1"
        className="mb-10 desktop:mb-0 text-center text-button font-normal"
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
        meet the team
      </Typography>

      <Typography
        variant="h2"
        as="p"
        className="mb-10 text-center text-button font-normal"
      >
        THE PEOPLE WHO
        <br />
        MAKE IT ALL HAPPEN
      </Typography>
    </section>
  );
};
