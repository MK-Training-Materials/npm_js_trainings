# Sample Test Structure

This section is about demonstrating typical test structure, major constructions and their features. Also, it's about to show how tests are normally run. In this section we'll create sample test (this time it's still empty), exercise major code constructions and see how output reflects the sequence of calls performed.

Before we start entering any code instructions, let's create **__tests__/testConstructionsDemo.test.js** file where all further examples will be placed.

## Major test constructions

### describe

First construction to go through is the **describe** construction. Mainly, the purpose of it is to be a container of any tests. It groups them under common block.

So, we can write the code like:
``` javascript
describe('Root Block', () => {
    // Code block here
});
```

Just pay attention that all the parentheses and curly brackets should have closing ones.

The **describe** statement has 2 paameters:
* description - some informative name which will later be shown in the output or any other reports
* body - the code block to be run as a part of current **describe** block. It will contain tests and some other auxiliary constructions (see below)

Describe blocks can be nested in case we have groups with some sub-group of tests. Let's add nested block into our test file. The code will look like:

``` javascript
describe('Root Block', () => {
    describe('Nested Block', () => {
        // Nested code block here
    });
    // Code block here
});
```

So far, there were no tests added. It's just about creating test containers.

### test

And now let's start adding some simple tests. 

Tests are defined as the **test** function call. Parameters are the same as for the **describe** block (description and executable block). The key difference is that **test blocks cannot be nested**.

Since we have both top-level and nested blocks, let's add a few sample tests to both of them. For this demo purposes I'll add 2 tests for each **describe** block. The code will look like:

``` javascript
describe('Root Block', () => {
    describe('Nested Block', () => {
        test('nested block test', () => {
            console.log('First nested block test');
        });
        test('another nested block test', () => {
            console.log('Second nested block test');
        });
    });
    test('root block test', () => {
        console.log('First root block test');
    });

    test('another root block test', () => {
        console.log('Second root block test');
    });
});
```

The **console.log** statement will just print the text which is passed as a parameter.

If we open this file in VSCode and run the top-most **describe** block by clicking icon in front of **describe** statement, we'll get the **Test Results** tab activated at the bottom with the content like:

```

TestRun "[npm_js_trainings] run tests: orta.vscode-jest:TestProvider:npm_js_trainings:8 (0)" started

> test@1.0.0 test
> jest --testLocationInResults --json --useStderr --outputFile /var/folders/y9/zzt300p953df5bvhqg4g5mfss7zz8c/T/jest_runner_npm_js_trainings_1920990476_2.json --testNamePattern Root Block --no-coverage --reporters default --reporters .../.vscode/extensions/orta.vscode-jest-6.4.4/out/reporter.js --colors --watchAll=false --testPathPatterns .../__tests__/testConstructionsDemo\.test\.js

  console.log
    First nested block test

      at Object.log (__tests__/testConstructionsDemo.test.js:6:21)

  console.log
    Second nested block test

      at Object.log (__tests__/testConstructionsDemo.test.js:9:21)

  console.log
    First root block test

      at Object.log (__tests__/testConstructionsDemo.test.js:27:17)

  console.log
    Second root block test

      at Object.log (__tests__/testConstructionsDemo.test.js:31:17)

 PASS  __tests__/testConstructionsDemo.test.js
  Root Block
    ✓ root block test
    ✓ another root block test
    Nested Block
      ✓ nested block test (17 ms)
      ✓ another nested block test (1 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        2.01 s
Ran all test suites matching .../__tests__/testConstructionsDemo\.test\.js with tests matching "Root Block".
```

Several things to observe here are:
* Tests are executed in the same order as they were placed from top to bottom. It's default behavior but we always need to keep in mind that the sequence can be different
* Nested tests are printed with some indent to reflect the **describe** block they belong to

#### skip

There can be some situations when tests are not runnable or for some reason there is necessity to disable them from running as a part of the entire test suite. It can be related either to flaky tests or very heavy tests affecting some critical functionality which requires separate controlled run.

In order to disable such test, the **skip** statement can be used. For our demo purposes let's add the following test into root describe block:

``` javascript
    test.skip('skipped test', () => {
        console.log('This test should be skipped');
    });
```

The overall file content should look like:

``` javascript
describe('Root Block', () => {
    describe('Nested Block', () => {
        test('nested block test', () => {
            console.log('First nested block test');
        });
        test('another nested block test', () => {
            console.log('Second nested block test');
        });
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
});
```

When we run the entire file now, the output will be the same except the test run summary which now looks like:

```
 PASS  __tests__/testConstructionsDemo.test.js
  Root Block
    ✓ root block test
    ✓ another root block test
    ○ skipped skipped test
    Nested Block
      ✓ nested block test (20 ms)
      ✓ another nested block test (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 skipped, 4 passed, 5 total
```

Skipped test is highlighted differently as well as it is included into overall statistics as the skipped test.

### beforeAll, beforeEach

Some of the tests may require some preparation steps before actual execution. It is normally related to some data setup, log into the system or any other steps to be done in order to make test ready to start.

For this purpose there are 2 major functions:
* **beforeAll** - runs once per **describe** block
* **beforeEach** - runs before each test within **describe** and any nested blocks

Both functions have only placeholder for executable code without any description. As it was written before, both functions are applied to some specific **describe** block. When run happens, they will take effect for any test within the block as well as for tests inside nested blocks. 

Also, it is important to know that before-functions of upper-level block have higher priority than similar functions in nested blocks.

In order to demonstrate it, let's add **beforeAll** and **beforeEach** functions both for root and nested blocks from our example. The code would look like:

``` javascript
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
});
```

Once we run the entire root block, the output will contain the following:
```
  console.log
    Root before all

      at Object.log (__tests__/testConstructionsDemo.test.js:39:17)

  console.log
    Nested before all

      at Object.log (__tests__/testConstructionsDemo.test.js:13:21)

  console.log
    Root before each

      at Object.log (__tests__/testConstructionsDemo.test.js:42:17)

  console.log
    Nested before each

      at Object.log (__tests__/testConstructionsDemo.test.js:16:21)

  console.log
    First nested block test

      at Object.log (__tests__/testConstructionsDemo.test.js:6:21)

  console.log
    Root before each

      at Object.log (__tests__/testConstructionsDemo.test.js:42:17)

  console.log
    Nested before each

      at Object.log (__tests__/testConstructionsDemo.test.js:16:21)

  console.log
    Second nested block test

      at Object.log (__tests__/testConstructionsDemo.test.js:9:21)

  console.log
    Root before each

      at Object.log (__tests__/testConstructionsDemo.test.js:42:17)

  console.log
    First root block test

      at Object.log (__tests__/testConstructionsDemo.test.js:27:17)

  console.log
    Root before each

      at Object.log (__tests__/testConstructionsDemo.test.js:42:17)

  console.log
    Second root block test

      at Object.log (__tests__/testConstructionsDemo.test.js:31:17)
```

If we cleanup the output just to see what was called and when, we'll get the following sequence of printed texts:

* Root before all - top-most beforeAll statement was called
* Nested before all
* Root before each
* Nested before each
* First nested block test
* Root before each
* Nested before each
* Second nested block test
* Root before each
* First root block test
* Root before each
* Second root block test

### afterAll, afterEach



## Running test

## Conclusion

[Sample exercises](https://www.jschallenger.com/dashboard/)
[CodeChef](https://www.codechef.com/practice/javascript)