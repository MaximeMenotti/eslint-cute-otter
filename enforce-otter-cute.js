module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that a variable named `otter` can only be assigned a value of 'cute'.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      // Performs action in the function on every variable declarator
      VariableDeclarator(node) {
        // Check if a `const` variable declaration
        if (node.parent.kind === "const") {
          // Check if variable name is `otter`
          if (node.id.type === "Identifier" && node.id.name === "otter") {
            // Check if value of variable is "cute"
            if (
              node.init &&
              node.init.type === "Literal" &&
              node.init.value !== "cute"
            ) {
              /*
               * Report error to ESLint. Error message uses
               * a message placeholder to include the incorrect value
               * in the error message.
               * Also includes a `fix(fixer)` function that replaces
               * any values assigned to `const otter` with "cute".
               */
              context.report({
                node,
                message:
                  'Value other than "cute" assigned to `const otter`. Unexpected value: {{ notBar }}.',
                data: {
                  notBar: node.init.value,
                },
                fix(fixer) {
                  return fixer.replaceText(node.init, '"cute"');
                },
              });
            }
          }
        }
      },
    };
  },
};
