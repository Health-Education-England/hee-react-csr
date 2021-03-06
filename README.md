# Introduction

Health Education England (HEE) React SPA using the Bloomreach Experience [React SDK](https://www.npmjs.com/package/@bloomreach/react-sdk).
The app is created using [create-react-app](https://github.com/facebook/create-react-app).

## Install and run
Customize `.env` to contain a correct [PUBLIC_URL](https://create-react-app.dev/docs/using-the-public-folder) path, for example:
```
PUBLIC_URL=http://localhost:3000
```

Beware of [this issue](https://github.com/facebook/create-react-app/pull/7259). The PUBLIC_URL may not work in development mode.

In the same `.env` file, also specify the brXM instance to fetch the page model from:
```
REACT_APP_LIVE_BR_BASE_URL=http://localhost:8080/site
REACT_APP_LIVE_SPA_BASE_URL=
REACT_APP_PREVIEW_BR_BASE_URL=http://localhost:8080/site/_cmsinternal
REACT_APP_PREVIEW_SPA_BASE_URL=/site/_cmsinternal?bloomreach-preview=true
```

Finally, build and run the React app as follows:

```bash
yarn
yarn dev
```

The CMS should now be accessible at <http://localhost:8080/cms>, and it should render the React app in preview mode in the Experience manager.
The SPA itself can be accessed directly via <http://localhost:3000>.

## Available scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br>
Open <http://localhost:3000> to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn start`

Runs the app in the production mode.<br> This will start an express server to
serve the app from the `build` folder. This requires the app to have been build
first by running `yarn build`.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
