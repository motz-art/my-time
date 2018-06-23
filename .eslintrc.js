module.exports = {
  "root": true,
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "globals": {
    "setTimeout": true,
    "clearTimeout": true,
    "setInterval": true,
    "clearInterval": true,
    "fetch": true
  },
  "env": {
    "es6": true
  },
  "extends": [ "xo", "prettier" ],
  "plugins": [ "prettier" ],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "printWidth": 90
      }
    ]
  },
  // "rules": {
  //   "for-direction": ["error"], //enforce “for” loop update clause moving the counter in the right direction
  //   "getter-return": ["error"], //enforce return statements in getters
  //   "no-await-in-loop": ["off"], //disallow await inside of loops
  //   "comma-dangle": ["error", "never"], //require or disallow trailing commas
  //   "no-cond-assign": "error", //disallow assignment operators in conditional expressions
  //   "no-console": "error", //disallow the use of console
  //   "no-constant-condition": "error", //disallow constant expressions in conditions
  //   "no-control-regex": "error", //disallow control characters in regular expressions
  //   "no-debugger": "error", //disallow the use of debugger
  //   "no-dupe-args": "error", //disallow duplicate arguments in function definitions
  //   "no-dupe-keys": "error", //disallow duplicate keys in object literals
  //   "no-duplicate-case": "error", //disallow duplicate case labels
  //   "no-empty": "error", //disallow empty block statements
  //   "no-empty-character-class": "error", //disallow empty character classes in regular expressions
  //   "no-ex-assign": "error", //disallow reassigning exceptions in catch clauses
  //   "no-extra-boolean-cast": "error", //disallow unnecessary boolean casts
  //   "no-extra-parens": ["error", "all", { "conditionalAssign": false, "nestedBinaryExpressions": false }], //disallow unnecessary parentheses
  //   "no-extra-semi": "error", //disallow unnecessary semicolons
  //   "no-func-assign": "error", //disallow reassigning function declarations
  //   "no-inner-declarations": "error", //disallow function or var declarations in nested blocks
  //   "no-invalid-regexp": "error", //disallow invalid regular expression strings in RegExp constructors
  //   "no-irregular-whitespace": "error", //disallow irregular whitespace outside of strings and comments
  //   "no-unsafe-negation": "error", //disallow negating the left operand in expressions
  //   "no-obj-calls": "error", //disallow calling global object properties as functions
  //   "no-regex-spaces": "error", //disallow multiple spaces in regular expression literals
  //   "no-sparse-arrays": "error", //disallow sparse arrays
  //   "no-unexpected-multiline": "error", //disallow confusing multiline expressions
  //   "no-unreachable": "error", //disallow unreachable code after return, throw, continue, and break statements
  //   "use-isnan": "error", //require calls to isNaN() when checking for NaN
  //   "valid-jsdoc": "error", //enforce valid JSDoc comments
  //   "valid-typeof": "error", //enforce comparing typeof expressions against valid strings

  //   "accessor-pairs": "error", //enforce getter and setter pairs in objects
  //   "array-callback-return": "error", //enforce return statements in callbacks of array methods
  //   "block-scoped-var": "error", //enforce the use of variables within the scope they are defined
  //   "complexity": "error", //enforce a maximum cyclomatic complexity allowed in a program
  //   "consistent-return": "error", //require return statements to either always or never specify values
  //   "curly": "error", //enforce consistent brace style for all control statements
  //   "default-case": "off", //require default cases in switch statements
  //   "dot-location": "error", //enforce consistent newlines before and after dots
  //   "dot-notation": "error", //enforce dot notation whenever possible
  //   "eqeqeq": "error", //require the use of === and !==
  //   "guard-for-in": "error", //require for-in loops to include an if statement
  //   "no-alert": "error", //disallow the use of alert, confirm, and prompt
  //   "no-caller": "error", //disallow the use of arguments.caller or arguments.callee
  //   "no-case-declarations": "error", //disallow lexical declarations in case clauses
  //   "no-div-regex": "error", //disallow division operators explicitly at the beginning of regular expressions
  //   "no-else-return": "error", //disallow else blocks after return statements in if statements
  //   "no-empty-function": "error", //disallow empty functions
  //   "no-empty-pattern": "error", //disallow empty destructuring patterns
  //   "no-eq-null": "error", //disallow null comparisons without type-checking operators
  //   "no-eval": "error", //disallow the use of eval()
  //   "no-extend-native": "error", //disallow extending native types
  //   "no-extra-bind": "error", //disallow unnecessary calls to .bind()
  //   "no-extra-label": "error", //disallow unnecessary labels
  //   "no-fallthrough": "error", //disallow fallthrough of case statements
  //   "no-floating-decimal": "error", //disallow leading or trailing decimal points in numeric literals
  //   "no-implicit-coercion": "error", //disallow shorthand type conversions
  //   "no-implicit-globals": "error", //disallow var and named function declarations in the global scope
  //   "no-implied-eval": "error", //disallow the use of eval()-like methods
  //   "no-invalid-this": "error", //disallow this keywords outside of classes or class-like objects
  //   "no-iterator": "error", //disallow the use of the __iterator__ property
  //   "no-labels": "error", //disallow labeled statements
  //   "no-lone-blocks": "error", //disallow unnecessary nested blocks
  //   "no-loop-func": "error", //disallow function declarations and expressions inside loop statements
  //   "no-magic-numbers": "off", //disallow magic numbers
  //   "no-multi-spaces": "error", //disallow multiple spaces
  //   "no-multi-str": "error", //disallow multiline strings
  //   "no-global-assign": "error", //disallow assignments to native objects or read-only global variables
  //   "no-new": "error", //disallow new operators outside of assignments or comparisons
  //   "no-new-func": "error", //disallow new operators with the Function object
  //   "no-new-wrappers": "error", //disallow new operators with the String, Number, and Boolean objects
  //   "no-octal": "error", //disallow octal literals
  //   "no-octal-escape": "error", //disallow octal escape sequences in string literals
  //   "no-param-reassign": "off", //disallow reassigning function parameters
  //   "no-proto": "error", //disallow the use of the __proto__ property
  //   "no-redeclare": "error", //disallow var redeclaration
  //   "no-return-assign": "error", //disallow assignment operators in return statements
  //   "no-script-url": "error", //disallow javascript: urls
  //   "no-self-assign": "error", //disallow assignments where both sides are exactly the same
  //   "no-self-compare": "error", //disallow comparisons where both sides are exactly the same
  //   "no-sequences": "error", //disallow comma operators
  //   "no-throw-literal": "error", //disallow throwing literals as exceptions
  //   "no-unmodified-loop-condition": "error", //disallow unmodified loop conditions
  //   "no-unused-expressions": "error", //disallow unused expressions
  //   "no-unused-labels": "error", //disallow unused labels
  //   "no-useless-call": "error", //disallow unnecessary calls to .call() and .apply()
  //   "no-useless-concat": "error", //disallow unnecessary concatenation of literals or template literals
  //   "no-useless-escape": "error", //disallow unnecessary escape characters
  //   "no-void": "error", //disallow void operators
  //   "no-warning-comments": "error", //disallow specified warning terms in comments
  //   "no-with": "error", //disallow with statements
  //   "radix": "error", //enforce the consistent use of the radix argument when using parseInt()
  //   "vars-on-top": "error", //require var declarations be placed at the top of their containing scope
  //   "wrap-iife": "error", //require parentheses around immediate function invocations
  //   "yoda": "error", //require or disallow “Yoda” conditions
  //   // JS Strict mode
  //   "strict": ["error", "safe"], //require or disallow strict mode directives

  //   "init-declarations": "off", //require or disallow initialization in var declarations
  //   "no-catch-shadow": "warn", //disallow catch clause parameters from shadowing variables in the outer scope
  //   "no-delete-var": "warn", //disallow deleting variables
  //   "no-label-var": "warn", //disallow labels that share a name with a variable
  //   "no-restricted-globals": "warn", //disallow specified global variables
  //   "no-shadow": "warn", //disallow var declarations from shadowing variables in the outer scope
  //   "no-shadow-restricted-names": "warn", //disallow identifiers from shadowing restricted names
  //   "no-undef": "warn", //disallow the use of undeclared variables unless mentioned in /*global */ comments
  //   "no-undef-init": "warn", //disallow initializing variables to undefined
  //   "no-undefined": "off", //disallow the use of undefined as an identifier
  //   "no-unused-vars": "warn", //disallow unused variables
  //   "no-use-before-define": "warn", //disallow the use of variables before they are defined

  //   "callback-return": "off", //require return statements after callbacks
  //   "global-require": "error", //require require() calls to be placed at top-level module scope
  //   "handle-callback-err": "error", //require error handling in callbacks
  //   "no-mixed-requires": "error", //disallow require calls to be mixed with regular var declarations
  //   "no-new-require": "error", //disallow new operators with calls to require
  //   "no-path-concat": "error", //disallow string concatenation with __dirname and __filename
  //   "no-process-env": "error", //disallow the use of process.env
  //   "no-process-exit": "error", //disallow the use of process.exit()
  //   "no-restricted-modules": "error", //disallow specified modules when loaded by require
  //   "no-sync": "error", //disallow synchronous methods

  //   // Code formatting rules
  //   "array-bracket-spacing": "warn", //enforce consistent spacing inside array brackets
  //   "block-spacing": "warn", //enforce consistent spacing inside single-line blocks
  //   "brace-style": "warn", //enforce consistent brace style for blocks
  //   "camelcase": "warn", //enforce camelcase naming convention
  //   "comma-spacing": "warn", //enforce consistent spacing before and after commas
  //   "comma-style": "warn", //enforce consistent comma style
  //   "computed-property-spacing": "warn", //enforce consistent spacing inside computed property brackets
  //   "consistent-this": "warn", //enforce consistent naming when capturing the current execution context
  //   "eol-last": "warn", //enforce at least one newline at the end of files
  //   "func-names": "off", //enforce named function expressions
  //   "func-style": "off", //enforce the consistent use of either function declarations or expressions
  //   "id-blacklist": "warn", //disallow specified identifiers
  //   "id-length": ["warn", { "exceptions": ["i", "j", "x", "y", "_"] }], //enforce minimum and maximum identifier lengths
  //   "id-match": "warn", //require identifiers to match a specified regular expression
  //   "indent": ["warn", 2, { "SwitchCase": 1 }], //enforce consistent indentation
  //   "jsx-quotes": "warn", //enforce the consistent use of either double or single quotes in JSX attributes
  //   "key-spacing": "warn", //enforce consistent spacing between keys and values in object literal properties
  //   "keyword-spacing": "warn", //enforce consistent spacing before and after keywords
  //   "linebreak-style": ["off"], //enforce consistent linebreak style
  //   "lines-around-comment": "warn", //require empty lines around comments
  //   "max-depth": "warn", //enforce a maximum depth that blocks can be nested
  //   "max-len": "off", //enforce a maximum line length
  //   "max-nested-callbacks": "warn", //enforce a maximum depth that callbacks can be nested
  //   "max-params": "warn", //enforce a maximum number of parameters in function definitions
  //   "max-statements": "off", //enforce a maximum number of statements allowed in function blocks
  //   "max-statements-per-line": "warn", //enforce a maximum number of statements allowed per line
  //   "new-cap": "warn", //require constructor function names to begin with a capital letter
  //   "new-parens": "warn", //require parentheses when invoking a constructor with no arguments
  //   "padding-line-between-statements": "off", //require or disallow padding lines between statements
  //   "newline-per-chained-call": "off", //require a newline after each call in a method chain
  //   "no-array-constructor": "warn", //disallow Array constructors
  //   "no-bitwise": "warn", //disallow bitwise operators
  //   "no-continue": "warn", //disallow continue statements
  //   "no-inline-comments": "warn", //disallow inline comments after code
  //   "no-lonely-if": "warn", //disallow if statements as the only statement in else blocks
  //   "no-mixed-spaces-and-tabs": "warn", //disallow mixed spaces and tabs for indentation
  //   "no-multiple-empty-lines": "warn", //disallow multiple empty lines
  //   "no-negated-condition": "warn", //disallow negated conditions
  //   "no-nested-ternary": "off", //disallow nested ternary expressions
  //   "no-new-object": "warn", //disallow Object constructors
  //   "no-plusplus": "off", //disallow the unary operators ++ and --
  //   "no-restricted-syntax": "warn", //disallow specified syntax
  //   "func-call-spacing": ["warn", "never"], //require or disallow spacing between function identifiers and their invocations
  //   "no-ternary": "off", //disallow ternary operators
  //   "no-trailing-spaces": "warn", //disallow trailing whitespace at the end of lines
  //   "no-underscore-dangle": "warn", //disallow dangling underscores in identifiers
  //   "no-unneeded-ternary": "warn", //disallow ternary operators when simpler alternatives exist
  //   "no-whitespace-before-property": "warn", //disallow whitespace before properties
  //   "object-curly-spacing": ["warn", "always"], //enforce consistent spacing inside braces
  //   "one-var": ["warn", "never"], //enforce variables to be declared either together or separately in functions
  //   "one-var-declaration-per-line": "warn", //require or disallow newlines around var declarations
  //   "operator-assignment": "warn", //require or disallow assignment operator shorthand where possible
  //   "operator-linebreak": "warn", //enforce consistent linebreak style for operators
  //   "padded-blocks": ["warn", "never"], //require or disallow padding within blocks
  //   "quote-props": "off", //require quotes around object literal property names
  //   "quotes": ["warn", "single", "avoid-escape"], //enforce the consistent use of either backticks, double, or single quotes
  //   "require-jsdoc": "off", //require JSDoc comments
  //   "semi": "warn", //require or disallow semicolons instead of ASI
  //   "semi-spacing": "warn", //enforce consistent spacing before and after semicolons
  //   "sort-imports": "warn", //enforce sorted import declarations within module
  //   "sort-vars": "warn", //require variables within the same declaration block to be sorted
  //   "space-before-blocks": "warn", //enforce consistent spacing before blocks
  //   "space-before-function-paren": ["warn", { "anonymous": "always", "named": "never" }], //enforce consistent spacing before function definition opening parenthesis
  //   "space-in-parens": "warn", //enforce consistent spacing inside parentheses
  //   "space-infix-ops": "warn", //require spacing around operators
  //   "space-unary-ops": "warn", //enforce consistent spacing before or after unary operators
  //   "spaced-comment": "warn", //enforce consistent spacing after the // or /* in a comment
  //   "wrap-regex": "warn", //require parenthesis around regex literals

  //   // ES6 styles
  //   "arrow-body-style": "error", // require braces around arrow function bodies
  //   "arrow-parens": ["error", "as-needed"], // require parentheses around arrow function arguments
  //   "arrow-spacing": "error", // enforce consistent spacing before and after the arrow in arrow functions
  //   "constructor-super": "error", // require super() calls in constructors
  //   "generator-star-spacing": ["error", { "before": true, "after": false }], // enforce consistent spacing around * operators in generator functions
  //   "no-class-assign": "error", // disallow reassigning class members
  //   "no-confusing-arrow": ["error", { "allowParens": true }], // disallow arrow functions where they could be confused with comparisons
  //   "no-const-assign": "error", // disallow reassigning const variables
  //   "no-dupe-class-members": "error", // disallow duplicate class members
  //   "no-duplicate-imports": "error", // disallow duplicate module imports
  //   "no-new-symbol": "error", // disallow new operators with the Symbol object
  //   "no-restricted-imports": "error", // disallow specified modules when loaded by import
  //   "no-this-before-super": "error", // disallow this/super before calling super() in constructors
  //   "no-useless-constructor": "error", // disallow unnecessary constructors
  //   "no-var": "error", // require let or const instead of var
  //   "object-shorthand": "error", // require or disallow method and property shorthand syntax for object literals
  //   "prefer-arrow-callback": "error", // require arrow functions as callbacks
  //   "prefer-const": "error", // require const declarations for variables that are never reassigned after declared
  //   "prefer-rest-params": "off", // require rest parameters instead of arguments
  //   "prefer-spread": "error", // require spread operators instead of .apply()
  //   "prefer-template": "error", // require template literals instead of string concatenation
  //   "require-yield": "error", // require generator functions to contain yield
  //   "template-curly-spacing": "error", // require or disallow spacing around embedded expressions of template strings
  //   "yield-star-spacing": "error" // require or disallow spacing around the * in yield* expressions
  // }
};
