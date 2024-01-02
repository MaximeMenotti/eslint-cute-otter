// enforce-otter-cute.test.js
const { RuleTester } = require("eslint");
const otterCuteRule = require("./enforce-otter-cute");

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  parserOptions: { ecmaVersion: 2015 },
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  "enforce-otter-cute", // rule name
  otterCuteRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: "const otter = 'cute';",
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: "const otter = 'baz';",
        output: 'const otter = "cute";',
        errors: 1,
      },
    ],
  }
);

console.log("All tests passed!");
