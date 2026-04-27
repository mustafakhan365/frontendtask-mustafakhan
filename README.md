# frontendtask-mustafakhan
Frontend Assessment For HHH
# React + TypeScript + Vite

After downloading repository run locally through following commands:
1. npm i
2. npm run dev

For Production run npm run build

# APIs used
1. https://dummyjson.com/users
2. https://jsonplaceholder.typicode.com/todos
3. https://jsonplaceholder.typicode.com/posts
4. https://jsonplaceholder.typicode.com/comments

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```