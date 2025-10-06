---

# 🎓 VocaLearn Turborepo

This is the **VocaLearn Monorepo**, a multi-app learning management system (LMS) built with **Next.js**, managed using **Turborepo**, and powered by **pnpm**.

Each app (e.g. **staff**, **admin**, **student**) lives inside the `apps/` directory and shares components, utilities, and configuration from the `packages/` workspace.

---

## 🚀 Getting Started

### 1. Install Dependencies

From the **root** of the repository, install all dependencies:

```bash
pnpm install
```

This installs everything for all apps and shared packages within the monorepo.

---

### 2. Environment Variables

Each app can have its own `.env.local` file inside its folder.

Only the **Staff app** requires a **TinyMCE API key** for the rich text editor.

#### 🔑 Staff app setup

Create the file:

```bash
apps/staff/.env.local
```

Add your TinyMCE API key:

```env
NEXT_PUBLIC_API_KEY=your_tinymce_api_key_here
```

> 🧩 The variable must start with `NEXT_PUBLIC_` so it can be used client-side in Next.js.

---

### 3. Run a Single App

You can run any app individually using:

```bash
pnpm dev --filter <app-name>
```

Examples:

```bash
pnpm dev --filter staff
pnpm dev --filter admin
pnpm dev --filter student
```

---

### 4. Run **All Apps** at Once

If you want to start **all apps in parallel** (useful during development):

```bash
pnpm dev
```

This assumes your root **package.json** has a script like this:

```json
"scripts": {
  "dev": "turbo run dev --parallel"
}
```

This command runs all apps that define a `dev` script (like `next dev`) at the same time.
Each app will run on its own port (e.g. 3000, 3001, 3002).

---

### 5. Build & Preview

Build a specific app:

```bash
pnpm build --filter <app-name>
```

Build **all apps** in the monorepo:

```bash
pnpm build
```

Preview a built app locally:

```bash
pnpm start --filter <app-name>
```

---

### ✅ Quick Reference

| Step | Command / File              | Description                      |
| ---- | --------------------------- | -------------------------------- |
| 1    | `pnpm install`              | Install all dependencies         |
| 2    | `apps/staff/.env.local`     | Add TinyMCE API key (staff only) |
| 3    | `pnpm dev --filter staff`   | Run the Staff app                |
| 4    | `pnpm dev`                  | Run all apps simultaneously      |
| 5    | `pnpm build`                | Build all apps                   |
| 6    | `pnpm start --filter staff` | Preview Staff app build          |

---


### 🧩 Example Environment

```env
# apps/staff/.env.local
NEXT_PUBLIC_API_KEY=abcd1234yourkeyhere
```

---mple for the root with all scripts (`dev`, `build`, `lint`, etc.) already set up for Turborepo + pnpm?
