# 🤝 Contributing Guide

Thank you for contributing! 🙌  
Please follow these rules to keep the project maintainable, consistent, and clean.

---

## 🌿 Branch Naming

Create feature branches from `master` using the pattern:

```
<prefix>/<JIRA-KEY>-<kebab-case-description>
```

**Allowed prefixes:**

- `feat` – new feature
- `fix` – bug fix
- `ci` – CI/CD or pipelines
- `chore` – dependencies or tooling updates
- `test` – test creation or modification

**Example:**

```
feat/ABC-123-add-login-e2e-test
```

---

## 📝 Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) and always include the **JIRA key**.

```
<type>: [JIRA-KEY] <short description>
```

**Examples:**

- `feat: [ABC-123] add login e2e test`
- `fix: [ABC-456] correct email validation error`

---

## 🧑‍💻 Code Style

- Follow **Prettier** and **ESLint** rules (run `npm run prettier && npm run eslint` before pushing).
- Do not commit directly to `master`. Always use branches and open a **Pull Request**.
- Keep functions small and focused.
- If a method takes **2 parameters**, pass them directly.
- If a method takes **more than 2 parameters**, define an **interface** and use it instead.

**Example:**

```ts
// ✅ Allowed (two params)
function login(email: string, password: string) { ... }

// ✅ Correct (more than two → use interface)
interface CreateUserParams {
  email: string;
  password: string;
  role: string;
}

function createUser(params: CreateUserParams) { ... }
```

---

## ✅ Pull Request Rules

- Keep PRs small and focused (max ~400 lines changed).
- Always link the **JIRA ticket**.
- Add screenshots for UI-related changes.
- Add or update **tests** when introducing new features or fixing bugs.
- Set pr label (test - for new tests, maintenance - for other changes)
- Set alexzavg as a reviewer
- Attach passed test run from manual run on CI (run only changed test on your branch)

---

## 🔄 Workflow Summary

1. Create branch:  
   `git checkout -b feat/ABC-123-add-login-tests`

2. Work on changes, commit with JIRA key:  
   `git commit -m "feat: [ABC-123] add login e2e test"`

3. Run formatters & linters before push:  
   `npm run prettier && npm run eslint`

4. Push and open **Pull Request** into `master`.

---

## 🚫 Protected Branches

- `master` is **protected**.
- No direct commits or merges allowed.
- Only **Pull Requests** with at least **1 reviewer approval** are allowed.

---

## 💡 Additional Tips

- Keep commits atomic and descriptive.
- Rebase instead of merging when syncing with `master`.
- Avoid committing sensitiva data.

---

Happy testing & coding! 🎯
