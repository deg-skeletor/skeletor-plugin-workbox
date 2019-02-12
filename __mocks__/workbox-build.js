const workboxBuild = {
    generateSW: jest.fn(() => mockWorkboxFn()),
    injectManifest: jest.fn(() => mockWorkboxFn())
};

function mockWorkboxFn(config) {
    return Promise.resolve({
        count: 1,
        size: 1
    });
}

module.exports = workboxBuild;