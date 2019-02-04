const workboxPlugin = require('./index');
const mockWorkbox = require('./__mocks__/workbox-build');

const logger = {
    info: jest.fn(),
    error: jest.fn()
}

describe('workbox plugin', () => {

    afterEach(() => {
        logger.info.mockReset();
        logger.error.mockReset();
    })

    describe('should return error response', () => {
        it('no configuration found', async () => {
            const expectedResp = {
                status: 'error',
                message: 'No configuration provided for Workbox plugin.'
            }
            const resp = await workboxPlugin().run({}, {logger});
            expect(resp).toEqual(expectedResp);
        });
    
        it('no workbox method found', async () => {
            const expectedResp = {
                status: 'error',
                message: 'No workbox method defined in config.'
            }
            const mockConfig = {fakeMethod: 'fake'};
            const resp = await workboxPlugin().run(mockConfig, {logger});
            expect(resp).toEqual(expectedResp);
        });
    
        it('workbox method not supported', async () => {
            const expectedResp = {
                status: 'error',
                message: 'Method not supported by workbox-build.'
            }
            const mockConfig = {method: 'fakeMethod'};
            const resp = await workboxPlugin().run(mockConfig, {logger});
            expect(resp).toEqual(expectedResp);
        });
    });
    

    it('should call generateSW', async () => {
        const mockConfig = {
            method: 'generateSW',
            workboxConfig: {
                swDest: 'dist/sw.js'
            }
        };
        await workboxPlugin().run(mockConfig, {logger});
        expect(mockWorkbox.generateSW).toHaveBeenCalledTimes(1);
        expect(mockWorkbox.generateSW).toHaveBeenCalledWith(mockConfig.workboxConfig);
    });

    it('should call injectManifest', async () => {
        const mockConfig = {
            method: 'injectManifest',
            workboxConfig: {
                swDest: 'dist/sw.js'
            }
        };
        await workboxPlugin().run(mockConfig, {logger});
        expect(mockWorkbox.injectManifest).toHaveBeenCalledTimes(1);
        expect(mockWorkbox.injectManifest).toHaveBeenCalledWith(mockConfig.workboxConfig);
    });

    it('should log if successful', async () => {
        const mockConfig = {
            method: 'generateSW',
            workboxConfig: {
                swDest: 'dist/sw.js'
            }
        };
        await workboxPlugin().run(mockConfig, {logger});
        expect(logger.info).toHaveBeenCalledTimes(1);
        expect(logger.info).toHaveBeenCalledWith('Generated dist/sw.js which will precache 1 files, or 1 bytes.')
    });

    it('should return success response, if successful', async () => {
        const mockConfig = {
            method: 'generateSW',
            workboxConfig: {
                swDest: 'dist/sw.js'
            }
        };
        const expectedResp = {
            status: 'success',
            message: 'Generated dist/sw.js which will precache 1 files, or 1 bytes.'
        };

        const resp = await workboxPlugin().run(mockConfig, {logger});
        expect(resp).toEqual(expectedResp);
    });
});