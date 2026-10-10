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

**1.** Use **import type** when importing TypeScript types only.

**2.** Use the **`@/` alias** for imports from the src directory.

**Exapmle:**

```ts
import type { User } from '@/types/User';
```

**3.** Create React components as named **arrow-function exports**.

**Example:**

```ts
export const UserCard = () => {
	return <div>User</div>;
};
```

**4.** Organize UI components according to the **[Atomic Design methodology](https://atomicdesign.bradfrost.com/chapter-2/)**: `atoms`, `molecules`, `organisms`, `templates`, and `pages`. Put each component in the appropriate category based on its role.

**Our starter Atomic Design file structure**:

```
src/
├── components/				# The core design system blocks
│		├── atoms/			# Buttons, Inputs, Typography
│		├── molecules/		# SearchBar, Dropdown
│ 		└── organisms/		# Navbar, Footer, ProductCard
│
├── templates/				# Layout blueprints (Can also live inside components/)
│
└── pages/					# Main route entries & data-fetching hubs
	├── HomePage.tsx
	├── CatalogPage.tsx
	├── ProductPage.tsx
	├── FavouritesPage.tsx
	└── CartPage.tsx
```

**5.** Give each component its own directory. Add an **`index.ts`** file in that directory to re-export the component, and import it through the **`@/` alias**.

**`index.ts` Example:**

```ts
export { Button } from './Button';
```

**Usage Example:**

```jsx
import { Button } from '@/components/atoms/Button';
```

**6.** Use **shadcn/ui** components for common interface elements when available. Customize them to match the project’s design, and use Tailwind CSS for styling.

**7.** Use **Tailwind CSS** utility classes for styling components. Avoid adding a separate styling solution unless the task requires it.

**8.** Follow the ESLint and Prettier rules configured in the project.

**9.** Keep changes focused and use clear names for files, components, variables, and functions.

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
