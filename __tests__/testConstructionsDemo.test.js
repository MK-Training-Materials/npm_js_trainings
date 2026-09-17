// const { beforeAll, beforeEach, afterAll, afterEach } = require("@jest/globals");

describe('Root Block', () => {
    describe('Nested Block', () => {
        test('nested block test', () => {
            console.log('First nested block test');
        });
        test('another nested block test', () => {
            console.log('Second nested block test');
        });

        beforeAll(() => {
            console.log('Nested before all');
        });
        beforeEach(() => {
            console.log('Nested before each');
        });

        // afterAll(() => {
        //     console.log('Nested after all');
        // });
        // afterEach(() => {
        //     console.log('Nested after each');
        // });
    });
    test('root block test', () => {
        console.log('First root block test');
    });

    test('another root block test', () => {
        console.log('Second root block test');
    });

    test.skip('skipped test', () => {
        console.log('This test should be skipped');
    });

    beforeAll(() => {
        console.log('Root before all');
    });
    beforeEach(() => {
        console.log('Root before each');
    });

    // afterAll(() => {
    //     console.log('Root after all');
    // });
    // afterEach(() => {
    //     console.log('Root after each');
    // });
});