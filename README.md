# Gamers Assemby Events
This repository contain the Gamers Assembly main site

It's build on fun technologies like:
- React Nextjs (https://github.com/zeit/next.js)
- Graphql (http://graphql.org/)

## Installation
```
npm install 
```

## Dev
With a local backoffice  
```
npm dev
```
Use the prod DB
```
BACKEND_API_URL=https://backoffice.gamers-assembly.com  EDITION=1 npm dev
```
### 
## ARGS
- BASE_URL : https://test.gamers-assembly.com 
- BACKEND_API_URL: https://backoffice.gamers-assembly.com
- BACKEND_LOCAL_API_URL: SSR url for backoffice (optional)
- CONTACT_PAGE_ID: Nid of the Contact Page Node on drupal
- PRESSE_PAGE_ID: Nid of the Presse Page Node on drupal
- LEGALS_PAGE_ID: Nid of the Legals Page Node on drupal


## Reminder
- Change lib/config.js
- Change styles/color.scss
- Generate favicon on https://realfavicongenerator.net 
- Change the Dockerfile Args