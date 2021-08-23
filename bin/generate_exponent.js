#!/usr/bin/env node
/** Generates the exponent.ts file. */

/** The maximum exponent to support. */
const MAX_EXPONENT = 4;

function formatExp(num) {
  if (num < -MAX_EXPONENT || num > MAX_EXPONENT) {
    return 'never';
  }
  if (num === 0) {
    return 'undefined';
  }
  return `${num}`;
}

function binaryTable(f) {
  let lines = [];
  for (let i = -MAX_EXPONENT; i <= MAX_EXPONENT; i++) {
    lines.push(`  [${i}]: {`);
    for (let j = -MAX_EXPONENT; j <= MAX_EXPONENT; j++) {
      lines.push(`    [${j}]: ${formatExp(f(i, j))};`);
    }
    lines.push(`  };`);
  }
  return lines.join('\n');
}

function ableTable(f) {
  let lines = [];
  for (let i = -MAX_EXPONENT; i <= MAX_EXPONENT; i++) {
    lines.push(`  [${i}]: ${ableValues(f, i)};`);
  }
  return lines.join('\n');
}

function ableValues(f, i) {
  let values = [];
  for (let j = -MAX_EXPONENT; j <= MAX_EXPONENT; j++) {
    const value = f(i, j);
    if (-MAX_EXPONENT <= value && value <= MAX_EXPONENT) {
      values.push(formatExp(j));
    }
  }
  return values.join(' | ');
}

function unaryTable(f) {
  let lines = [];
  for (let i = -MAX_EXPONENT; i <= MAX_EXPONENT; i++) {
    lines.push(`  [${i}]: ${formatExp(f(i))};`);
  }
  return lines.join('\n');
}

/** An array of all exponents. */
const EXPONENTS = Array.from(
  {length: MAX_EXPONENT * 2 + 1},
  (_, i) => i - MAX_EXPONENT
);

const TEMPLATE = `// GENERATED FILE | DO NOT MODIFY
//
// Make changes instead to bin/generate_exponent.js and regenerate.

/**
 * Defines valid dimensional exponents and arithmetic over them.
 *
 * This module allows us to compute types of unit operations at compile time
 * rather than just at runtime. For example, we can determine that the
 * return type of
 *
 * \`\`\`
 *   const meter = makeUnit('m', {length: 1})
 *         ^ Unit<{length: 1>}
 *   const m2 = meter.times(meter);
 *   //    ^ Unit<{length: 2}>
 * \`\`\`
 *
 * This allows us to make pretty strong type guarantees despite flexible unit
 * and quantity arithmetic.
 *
 * Note that TypeScript currently doesn't allow us to perform arithmetic on
 * numeric literal types directly so we resort to lookup tables instead.
 */

/**
 * List of valid dimensional exponents.
 *
 * To make dimensions prettier for humans, we replace the exponent \`0\` with
 * \`undefined\` since a dimension of \`{length: 1}\` is easier to read than a
 * dimension of \`{length: 1, mass: 0, ...}\`. Note that this does make the
 * arithmetic lookup tables a bit more complex since we need to convert between
 * \`undefined\` and \`0\` since \`undefined\` isn't a valid property name.
 */
export type Exponent = ${EXPONENTS.map(x => formatExp(x)).join(' | ')};

/**
 * Type guard returning whether x is a valid Exponent.
 * @param x Any value.
 */
export function isExponent(x: unknown): x is Exponent {
  if (typeof x === 'undefined') {
    return true;
  }

  if (typeof x !== 'number') {
    return false;
  }

  return [${EXPONENTS.filter(x => x !== 0)
    .map(x => formatExp(x))
    .join(', ')}].indexOf(x) >= 0;
}

/**
 * Adds two exponents.
 *
 * For example:
 *
 * \`\`\`
 *   type foo = Add<1, 2>;
 *   //   ^ 3
 *   type bar = Add<-3, 1>;
 *   //   ^ -2
 * \`\`\`
 *
 * The resulting value must be in range of valid defined exponents, otherwise
 * we return \`never\`:
 *
 * \`\`\`
 *   type foo = Add<${MAX_EXPONENT}, 1>;
 *   //   ^ 'never'
 * \`\`\`
 */
// prettier-ignore
export type Add<A extends Exponent, B extends Exponent> =
  _Add[UndefinedToZero<A>][UndefinedToZero<B>];

interface _Add extends BinaryTable {
${binaryTable((a, b) => a + b)}
}

/**
 * Returns the exponents that can be added to the given one without
 * overflowing.
 *
 * For example:
 * \`\`\`
 *   type foo = Addable<3>;
 *   //   ^ ${ableValues((a, b) => a + b, 3)}
 */
export type Addable<A extends Exponent> =
  // Note that this _could_ have been defined by:
  // \`\`\`
  // _Subtract[_Add[LookupExponent][A]][A]
  // \`\`\`
  // rather than by a table, but that causes TypeScript to start complaining
  // that our “type instantiation is excessively deep and possibly infinite”.
  _Addable[UndefinedToZero<A>];

interface _Addable extends UnaryTable {
${ableTable((a, b) => a + b)}
}

/**
 * Subtracts two exponents.
 *
 * For example:
 *
 * \`\`\`
 *   type foo = Subtract<3, 2>;
 *   //   ^ 1
 *   type bar = Subtract<-3, -2>;
 *   //   ^ -1
 * \`\`\`
 *
 * The resulting value must be in range of valid defined exponents, otherwise
 * we return \`never\`:
 *
 * \`\`\`
 *   type foo = Subtract<-${MAX_EXPONENT}, 1>;
 *   //   ^ 'never'
 * \`\`\`
 */
export type Subtract<
  A extends Exponent,
  B extends Exponent
> = _Subtract[UndefinedToZero<A>][UndefinedToZero<B>];

interface _Subtract extends BinaryTable {
${binaryTable((a, b) => a - b)}
}

/**
 * Returns the exponents that can be subtracted from the given one without
 * overflowing.
 *
 * For example:
 * \`\`\`
 *   type foo = Subtractable<3>;
 *   //   ^ ${ableValues((a, b) => a - b, 3)}
 */
export type Subtractable<A extends Exponent> =
  // Note that this _could_ have been defined by:
  // \`\`\`
  // _Add[_Subtract[LookupExponent][A]][A]
  // \`\`\`
  // rather than by a table, but that causes TypeScript to start complaining
  // that our “type instantiation is excessively deep and possibly infinite”.
  _Subtractable[UndefinedToZero<A>];

interface _Subtractable extends UnaryTable {
${ableTable((a, b) => a - b)}
}

/**
 * Returns the negative value of an exponent.
 *
 * For example:
 *
 * \`\`\`
 *   type foo = Negate<3>;
 *   //   ^ -3
 *   type bar = Negate<undefined>;
 *   //   ^ undefined
 * \`\`\`
 */
export type Negate<X extends Exponent> = _Negate[UndefinedToZero<X>];

interface _Negate extends UnaryTable {
${unaryTable(x => -x)}
}

/**
 * Returns the double value of an exponent.
 *
 * For example:
 *
 * \`\`\`
 *   type foo = Double<2>;
 *   //   ^ 4
 *   type bar = Double<-1>;
 *   //   ^ -2
 * \`\`\`
 */
export type Double<X extends Exponent> = _Double[UndefinedToZero<X>];

interface _Double extends UnaryTable {
${unaryTable(x => x * 2)}
}

/**
 * Returns the triple value of an exponent.
 *
 * For example:
 *
 * \`\`\`
 *   type foo = Triple<1>;
 *   //   ^ 3
 *   type bar = Triple<-1>;
 *   //   ^ -3
 * \`\`\`
 */
export type Triple<X extends Exponent> = _Triple[UndefinedToZero<X>];

interface _Triple extends UnaryTable {
${unaryTable(x => x * 3)}
}

/**
 * Exponents as used in the arithmetic lookup tables in this file. This is the
 * same as \`Exponent\` but with \`undefined\` replaced by \`0\` since the first can
 * not be used as a property name of a JavaScript object.
 */
type LookupExponent = Exclude<Exponent, undefined> | 0;

/**
 * A unary arithmetic lookup tables maps a single (arithmetic) exponents to a
 * new exponent.
 */
type UnaryTable = {
  [A in LookupExponent]: Exponent;
};

/**
 * A binary arithmetic lookup tables map two (arithmetic) exponents to a new
 * exponent.
 */
type BinaryTable = {
  [A in LookupExponent]: UnaryTable;
};

/** Convert an Exponent into a \`LookupExponent\`. */
type UndefinedToZero<X extends Exponent> = X extends undefined ? 0 : X;
`;

process.stdout.write(TEMPLATE);
