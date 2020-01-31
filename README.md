# valico-admin

Part of this ecosystem
![alt text](https://github.com/pierrotagency/valico-admin/blob/master/doc/ecosystem.jpg?raw=true)

Valico admin with ReactJS

## Install
```bash
yarn
```
Must link theme project with

In theme project
```bash
yarn link
```

In current project
```bash
yarn link "vaslico-custom-theme"
```
for example *"valico-sanmartin"*

## Run
```bash
npm start
```

## Buid
```bash
yarn build
```

### large package? let's see
```bash
yarn analyze
```



# Known problems

## on YARN BUILD

- FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory” error
    
    https://stackoverflow.com/questions/55613789/how-to-fix-fatal-error-ineffective-mark-compacts-near-heap-limit-allocation-fa
    In .env: GENERATE_SOURCEMAP=false
    Works but...

    but its better to increase memory in node (so i went back to TRUE) and enable sourcemaps so we can analyze bundle
    https://discourse.aurelia.io/t/fatal-error-ineffective-mark-compacts-near-heap-limit-allocation-failed-javascript-heap-out-of-memory/2222/11

    https://create-react-app.dev/docs/analyzing-the-bundle-size/