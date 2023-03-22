# Realtime Collaborative Code Frontend 

## Languages, Frameworks and Packages 

- CRA
- TypeScript
- SCSS
- React
- Redux-toolkit
- Yjs
- Monaco Editor
- WebRTC
- ...


## Files/Directories

| Path                    | Purpose                                                     |
| ----------------------- | ----------------------------------------------------------- |
| /.storybook/            | contains Storybook config files                             |
| /.eslintrc              | settings for `ESLint`                                       |
| /.hygen.js              | settings for `Hygen`                                        |
| /_templates/            | contains scaffolding templates based on `Hygen`             |
| /.stylelintrc.js        | settings for `Stylelint`                                    |
| /.vscode/               | settings for `Visual Studio Code` workspace                 |
| /package.json           | manifest file for Node.js projects                          |
| /tsconfig.json          | settings for `TypeScript`                                   |
| /dist/                  | contains production build codes                             |
| /public/                | root folder that gets served up as our react app.           |
| /src/components/        | contains Atomic Design components                           |
| /src/container/         | contains Logic handler                                      |
| /src/pages/             | contains pages                                              |
| /src/assets/            | contains images, movies, fonts                              |
| /src/store/             | contains shared store                                       |
| /src/services/          | contains shared services                                    |
| /src/styles/            | contains common styles: breakpoints, colors, font, mixin, function               |
| /src/index.tsx/         | contains root file                                          |
| /src/App.tsx            | contains application page index                             |
| /src/index.scss         | contains shared styles                                      |
| /src/react-app-env.d.ts | contains shared types                                       |
---

## Command Line

| Path                    | Purpose                                                     |
| ----------------------- | ----------------------------------------------------------- |
| yarn start              | start the project                                           |
| yarn buid               | build the project                                           |
| yarn test               | run unit test                                               |
| gen:component           | generate new `atomic` component                             |
| gen:page                | generate new page                                           |
| yarn storybook          | run the storybook                                           |
| yarn lint:script        | run `Eslint` to check the syntax                            |
| yarn lint:style         | run `Stylelint` to check the syntax                         |
---