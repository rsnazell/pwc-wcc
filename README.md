## PWC Coding Challenge

This responsive, screen-reader friendly app renders the current weather and weekly forecast for a given location. Users can input a new location and change between metric/imperial units.

https://pwc-wcc.netlify.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It uses TypeScript, Material UI, Styled Components, Jest, React Testing Library.

Weather data is sourced from [OpenWeatherMap](https://openweathermap.org/). To limit unnecessary API calls, caching has been implemented using sessionStorage. Maximum cache time is 60 mins.

## Getting Started

To run the application locally, first obtain an APPID key from [OpenWeatherMap](https://openweathermap.org/). Git clone the repository and run the following commands:

```
cd pwc-wcc
npm install
echo 'REACT_APP_OWM_ID=*REPLACE_WITH_APPID*' > .env.local
npm start
```

## Todo / Roadmap

- request users' current location using Web Geolocation API and prepopulate location input
- combine location lookup / get weather data into single API call
- some desired attributes not currently available from chosen API (precipitation, pollen count)
- update manifest.json

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
