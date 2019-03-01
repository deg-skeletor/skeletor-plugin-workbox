const workboxBuild = require('workbox-build');

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
    };
}

function run(config, {logger}) {
    if(Object.keys(config).length === 0) {
        return handleError('No configuration provided for Workbox plugin.', logger);
    }

    if(!config.method) {
        return handleError('No workbox method defined in config.', logger);
    }

    if(!workboxBuild[config.method]) {
        return handleError('Method not supported by workbox-build.', logger);
    }

    return workboxBuild[config.method](config.workboxConfig)
            .then(resp => handleSuccess(resp, logger, config.workboxConfig.swDest));

}

module.exports = function() {
    return {
        run
    };
};