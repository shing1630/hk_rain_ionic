# HK Rain Ionic
# App for IOS and Android - application with Ionic Framework

## Introduction

This is app application for forcasting the weather in Hong Kong.

## ![Apple store](https://www.zapopen.com/images/AppStore_Button.png)
## [https://appsto.re/hk/zMbVib.i](https://appsto.re/hk/zMbVib.i)

## ![Goolge Play](https://play.google.com/intl/en_us/badges/images/badge_new.png)
## [https://play.google.com/store/apps/details?id=com.hkrain0730](https://play.google.com/store/apps/details?id=com.hkrain0730)


## System Architecture

Front end: Ionic Framework + Cordova


## Prerequisites

Make sure you have nodejs installed.

Install npm
```
// install npm
sudo apt-get install npm
sudo apt-get update
```

Install cordova
```
// install cordova
npm install -g cordova
```


Install Ionic CLI
```
// install Ionic CLI
npm install -g ionic
```

## Install packages

```
    npm install          <= install all the npm Dependencies listed in package.json
    npm run build        <= build and compile 
    npm run deploy       <= start the Nodemon and watch for changes.
```

## Directory Structure

```
HK Rain Ionic
│───declarations.d.ts
│───index.html
│───manifest.json
│───service-worker.js
│
├───app
│   ├───app.component.ts
│   ├───app.html
│   ├───app.module.ts
│   ├───app.scss
│   ├───globalVar.ts
│   ├───main.ts
│
├───assets
│   ├───i18n
│   │   ├───en.json
│   │   ├───zh.json
│   │
│   ├───icon
│   │   ├───favicon.ico
│   │
│   └───img
│       ├───icon
│       │   ├───drizzle.png
│       │   ├───heavy.png
│       │   ├───light.png
│       │   ├───moderate.png
│       │   ├───sunshine.png
│       │   ├───violent_torrential.png
│       │
│       └───logo
│           ├───hkRain_ain.gif
│           ├───hkRain_t_1.gif
│           ├───hkRain_t_2.gif
│           ├───hkRain_t_3.gif
│           ├───hkRain_t_non.gif
│           ├───hk_rain_sign.png
│           ├───hk_rain_sign_black.png
│
├───globalVar
│       gv.ts
│
├───models
│   ├───Account.ts
│   ├───Feedback.ts
│   ├───Forecast.ts
│   ├───ResultWeather.ts
│   ├───Weather.ts
│
├───pages
│   ├───about
│   │   ├───about.html
│   │   ├───about.scss
│   │   ├───about.ts
│   │
│   ├───calculateWeather
│   │   ├───calculateWeather.css
│   │   ├───calculateWeather.html
│   │   ├───calculateWeather.ts
│   │   ├───calculateWeatherDtl.html
│   │   ├───calculateWeatherDtl.ts
│   │
│   ├───rptFeedback
│   │   ├───rptFeedback.html
│   │   ├───rptFeedback.scss
│   │   ├───rptFeedback.ts
│   │
│   ├───setting
│   │    ├───setting.html
│   │    ├───setting.scss
│   │    ├───setting.ts
│   │
│   └───weatherForecast
│       ├───weatherForecast.html
│       ├───weatherForecast.scss
│       ├───weatherForecast.ts
│
├───services
│   ├───feedback.service.ts
│   ├───forecast.service.ts
│   ├───weather.service.ts
│
└───theme
    ├───variables.scss
```



## License

MIT
