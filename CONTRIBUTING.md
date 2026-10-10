# Contributing

Thank you for contributing to this project. Please follow these guidelines so the team can review and integrate changes consistently.

## Before you start

**1.** Find the Jira issue for your task. If one does not exist, ask the project manager to create it **or** create it yourself.

**2.** Make sure the issue is assigned to you and is **In Progress**.

**3.** Start from the latest `main` branch.

## Branch naming

Create a short-lived branch for one Jira issue. Use this format:

```
<JIRA-KEY>_<short-description>
```

Use a short description in lowercase, with words separated by hyphens.

**Example:**

```
SCRUM-36_add-home-page
```

Keep the branch focused on its Jira issue. Do not include unrelated changes.

## Code guidelines

### TypeScript and imports

- Use `import type` when importing TypeScript types only.

- Use the `@/` alias for imports across `src` directories. Relative imports are allowed between files in the same component directory.

- Keep imports grouped and sorted according to the ESLint `import/order` rule.

```tsx
import type { User } from '@/types/User';

import { Button } from '@/components/ui/button';
import { formatName } from './formatName';
```

### React components

- Define React components as named arrow functions.

- Give components and their props clear, specific names.

- Avoid using `any`; define or reuse a type for values that need one.

```tsx
type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => {
  return <div>{user.name}</div>;
};
```

### Project structure and Atomic Design

Organize the project's own UI components according to the [Atomic Design methodology](https://atomicdesign.bradfrost.com/chapter-2/):

- **Atoms** are basic UI elements, such as project-specific buttons, inputs, and labels.

- **Molecules** combine atoms into small, reusable components, such as a search field.

- **Organisms** combine smaller components into larger sections, such as a navigation bar or footer.

- **Templates** define page layouts.

- **Pages** compose templates and page-specific content.

Use this starter structure:

```text
src/
├── assets/
│   ├── fonts/
│   └── images/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── ui/                 # shadcn/ui components
├── hooks/
├── pages/
├── templates/
├── types/
├── utils/
├── App.tsx
├── index.css
└── main.tsx
```

- Give each project-owned component its own directory. Put the component in a file with the same name and add an `index.ts` file to re-export it.

- Import project-owned components through their directory and the `@/` alias.

- Keep shadcn/ui components in `src/components/ui/`. They are source files managed by the project and may be customized. The shadcn CLI generates them as individual files, so they are exempt from the per-component directory and `index.ts` convention.

- Put reusable hooks in `src/hooks/`, shared TypeScript types in `src/types/`, and shared non-UI helper functions in `src/utils/`.

Example project-owned component:

```text
src/components/atoms/UserCard/
├── UserCard.tsx
└── index.ts
```

```tsx
// src/components/atoms/UserCard/UserCard.tsx
import type { User } from '@/types/User';

type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => {
  return <div>{user.name}</div>;
};
```

```ts
// src/components/atoms/UserCard/index.ts
export { UserCard } from './UserCard';
```

```tsx
import { UserCard } from '@/components/atoms/UserCard';
```

### Styling and accessibility

- Use Tailwind CSS utility classes to style components.

- Use shadcn/ui components for common interface elements when available. Customize their source code to match the project’s design.

- Use the shared design tokens and CSS variables defined in `src/index.css` instead of repeating hard-coded colors.

- Keep custom CSS in `src/index.css` for global styles or cases that are awkward to express with Tailwind.

- Prefer semantic HTML elements. Provide accessible names for controls and ensure interactive elements can be used with a keyboard.

### General

- Follow the ESLint and Prettier rules configured in the project.

- Keep changes focused. Use clear names for files, components, variables, and functions.

- Keep reusable UI components focused on rendering and interaction. Put page-level composition and data loading in pages or hooks.

## Commits

Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format with the Jira issue key as the scope:

```
<type>(<JIRA-KEY>): <short description>
```

**Examples:**

```
feat(SCRUM-49): add home page

fix(SCRUM-61): correct button alignment

refactor(SCRUM-132): simplify user lookup

docs(SCRUM-72): document contribution workflow

chore(SCRUM-9): configure import aliases
```

Use **feat** for new functionality, **fix** for bug fixes, **refactor** for code changes that do not alter behavior, **docs** for documentation, **test** for tests, and **chore** for project maintenance.

Make commits focused and frequent enough to keep the change history understandable.

Before opening a pull request:

- Bring your branch up to date with main.

- Fix any reported issues and commit the changes to your task branch.

## Pull requests

Open a pull request **from your task branch into main**.

Use a title that follows the commit format:

```
<type>(<JIRA-KEY>): <short description>
```

- Describe what changed and link the Jira issue.

- Mention any dependencies, extra checks, or details reviewers should know.

- Request a review from other team members.

- Wait for the required review and all status checks to pass before merging.

- If review feedback requires changes, commit and push them to the same branch.

Your can use [Pull request templete](.github/pull_request_template.md)

## General workflow

**1. If it's your first time on this project, clone this repo.**

**2. Switch to the Node.js version specified in `.nvmrc`**.

**3. Install dependencies:**

```
npm ci
```

**4. Start the development server:**

```
npm run dev
```

**5. Make sure you are working with the latest version of the main branch:**

```
git pull origin main
```

**6. Create a new branch for the task you picked. See [Branch Naming](#branch-naming):**

```
git switch -c <JIRA-KEY>_<short-description>
```

or

```
git checkout -b <JIRA-KEY>_<short-description>
```

**7. Implement your task.**

**8. Stage your changes:**

```
git add <your file>
```

or stage all changed files at once:

```
git add .
```

You can also check your staged files using:

```
git status
```

**9. Make a commit. See [Commits](#commits):**

```
git commit -m "<type>(<JIRA-KEY>): <short description>"
```

**10. If lint checks are passed make sure you are working with the latest version of the main branch (again):**

```
git pull origin main
```

**11. Push changes to the origin (GitHub):**

```
git push origin <your branch name>
```

**12. Open a new pull request. See [Pull requests](#pull-requests).**

**13. After the pull request is merged, delete the task branch and move the Jira issue to the appropriate status.**
