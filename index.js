const {generateSW, injectManifest} = require('workbox-build');

function handleError(msg, logger) {
    logger.error(msg);
    return Promise.resolve({
        status: 'error',
        message: msg
    });
}

function handleSuccess({count, size}, logger, swDest) {
    const message = `Generated ${swDest} which will precache ${count} files, or ${size} bytes.`;
    logger.info(message);
    return {
        status: 'success',
        message: message
    }
}

function run(config, {logger}) {
    if(Object.keys(config).length === 0) {
        return handleError('No configuration provided for Workbox plugin.', logger);
    } else {
        switch(config.method) {
            case 'generateSW':
                return generateSW(config.workboxConfig).then(resp => handleSuccess(resp, logger, config.workboxConfig.swDest));
            case 'injectManifest':
                return injectManifest(config.workboxConfig).then(resp => handleSuccess(resp, logger, config.workboxConfig.swDest));
            case undefined:
                return handleError('No workbox method defined in config.', logger);
            default:
                return handleError('Method not supported by workbox-build.', logger);
        }
    }
}

module.exports = function() {
    return {
        run
    }
}