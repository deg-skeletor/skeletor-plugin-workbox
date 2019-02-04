# Skeletor Workbox Plugin
[![Build Status](https://travis-ci.org/deg-skeletor/skeletor-plugin-workbox.svg?branch=master)](https://travis-ci.org/deg-skeletor/skeletor-plugin-workbox)

The purpose of this plugin is to generate a service worker for your project. It will be an interface with [Workbox](https://rollupjs.org) for the Skeletor ecosystem. To learn more about Skeletor, [go here](https://github.com/deg-skeletor/skeletor-core).

## Installation
Install this plugin into your Skeletor-equipped project via the following terminal command: 
```
    npm install --save-dev @deg-skeletor/plugin-workbox
```

## Configuration

### Config Options

**method**

Type: `String`

Possible Values: `'generateSW'`, `'injectManifest'`

The (workbox-build)[https://developers.google.com/web/tools/workbox/modules/workbox-build] method you want to use.

**workboxConfig**

Type: `Object`

The config to be passed through to workbox-build. See their (documentation)[https://developers.google.com/web/tools/workbox/modules/workbox-build] for a guide.

### Example Config
```
{
    method: 'generateSW',
    workboxConfig: {
        // workbox specific configuration
    }
}
```

## The Status Object
The Status Object is a simple Javascript `Object` for storing the current status of the plugin. It is returned by the `run` method of this plugin.

The structure is as follows:

### Properties

**status**

Type: `String`

Possible Values: `'complete'`, `'error'`

Contains the status of the plugin. If the plugin has completed successfully, the `'complete'` value should be used. If an error was encountered during plugin execution, the `'error'` value should be used.

**message**

Type: `String`

Contains any additional information regarding the status of the plugin. If the plugin executed successfully, this property could include information about what the plugin accomplished. If the plugin encountered an error, this property could include error details.

## Required Add-Ins
[workbox-build](https://www.npmjs.com/package/workbox-build): integrates node-based build process with workbox