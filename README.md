# Physical Units for TypeScript

`@buge/ts-units` is a package for modeling typed physical units in TypeScript.

It allows you to tell users what you need in a typesafe manner

```ts
function setTemperature(t: Temperature) {
  ...
}
```

while letting them work in units that make sense to them

```ts
setTemperature(celsius(21.3));
```

Units can easily be converted from one to another

```ts
const t = celsius(21.3).in(fahrenheit);
```

compared

```ts
meters(1) < feet(4)
```

and used in mathematical expressions

```ts
const length = meters(5).plus(centimeters(3));
const speed = length.per(seconds(2));
```

## Basic Usage

Install from npm or using your favorite package manager:

```sh
npm install @buge/ts-units
```

Simply declare quantities using the built-in units:

```ts
import {Length, meters} from '@buge/ts-units/length';
const length: Length = meters(5);
```

See [Built-in Units](#built-in-units) below for an overview of all built-in
units.

### Displaying

Quantities provide a `toString()` method that allows them to be easily rendered
to a string:

```ts
celsius(23.1).toString()  // '23.1ºC'
```

For custom formatting, the amount and symbol can be easily extracted from the
quantity:

```ts
const temp = celsius(23.1);
const html =
    `<span class="amount">${temp.amount.toFixed(1)}</span>` +
    `<span class="symbol">${temp.unit.symbol}</span>`
```

### Conversion

Quantities can easily be converted from one unit to another using the `in`
method:

```ts
const length = meters(5.3).in(feet);
const temp = celsius(23.1).in(fahrenheit);
```

Quantities can (perhaps obviously) only be converted from units belonging to
the same physical dimension in this way, but see
[Multiplication and Division](#multiplication-and-division) below for some more
advanced conversions.

### Comparing

Quantities can be freely compared to one another using standard TypeScript
operators (thanks to [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)):

```ts
meters(1) < feet(4)
```

Because of the inprecision in floating point arithmetics, you should prefer to
use the `isCloseTo` method when checking a quantity for equality:

```ts
// Returns whether 1m is within 0.01 feet of 3.28 feet.
meters(1).isCloseTo(feet(3.28), 0.01)
```

### Addition and Subtracting

Quantities of the same physical dimension can be freely added using `plus` and
subtracted using `minus`:

```ts
const time = minutes(3).plus(seconds(2));
const length = meters(5).minus(feet(1));
```

The unit of the quantities returned will default to the unit of the quantity
being added or subtracted.

### Multiplication and Division

Quantities can be multiplied with `times` and divided with `per`, resulting in
new dimensions being returned:

```ts
const area: Area = meters(5).times(meters(6));
const speed: Speed = kilometers(150).per(hours(2));
```

A special case are multiplications with dimensionless units which result in
the same unit being returned:

```ts
const length: Length = meters(5).times(percent(10));  // 0.5m
```

## Built-in Units

Here’s a reference of all units that we currently have built-in to the library.

### Angle

```ts
import {Angle, degrees, sin} from '@buge/ts-units/length';
const angle: Angle = degrees(30);
const s = sin(angle);
```

**Units:**\
radians, degrees, turns

**Trigonometric Functions:**\
sin, cos, tan, asin, acos, atan, atan2

### Length

```ts
import {Length, meters} from '@buge/ts-units/length';
const length: Length = meters(5);
```

**Metric Units:**\
meters, kilometers, centimeters, millimeters, micrometers, nanometers,
picometers, femtometers, fermi, angstrom, micron

**Imperial Units:**\
yards, feet, inches, chains, furlongs, miles

**Marine Units:**\
fathoms, nauticalMiles

**Astronomical Units:**\
astronomicalUnits

### Mass

```ts
import {Mass, kilogram} from '@buge/ts-units/mass';
const mass: Mass = kilogram(5);
```

**Units:**\
kilogram, gram

### Scalar

Technically not a physical dimension but still very useful.

```ts
import {Scalar, percent} from '@buge/ts-units/scalar';
const scalar: Scalar = percent(20);
```

**Units:**\
percent, permille, permyriad

### Speed

```ts
import {Speed, metersPerSecond} from '@buge/ts-units/speed';
const speed: Speed = metersPerSecond(343);
```

**Units:**\
metersPerSecond, kilometersPerHour, milesPerHour, knots, feetPerSecond

### Temperature

```ts
import {Temperature, celsius} from '@buge/ts-units/temperature';
const temperature: Temperature = celsius(23.1);
```

**Units:**\
kelvin, celsius, fahrenheit, rankine

### Time

```ts
import {Time, minutes} from '@buge/ts-units/time';
const time: Time = minutes(5);
```

**Units:**\
seconds, milliseconds (msec), microseconds (usec), nanoseconds, minutes, hours

## Defining new Units

New units of existing dimensions can easily be defined on the basis of an
existing one. As an example, here’s how the yard is defined:

```ts
const yards: Unit<Length> = meters.times(0.9144).withSymbol('yd');
```

Similar how quantities can be multiplied and divided you can create new derived
units by multiplying them using `time` or dividing them using `per`:

```ts
const knots: Unit<Speed> = nauticalMiles.per(hours).withSymbol('kn');
```

As shown above, you can configure the symbol for the unit using `withSymbol`
that will be suffixed to the amount when printing a quantity using
`toString()`. You can provide any arbitrary string. The symbol be retrieved
from the unit using the `.symbol` property or from a quantity using
`.unit.symbol`.

We provide a dedicated method to create derived units with SI prefix that both
scale the unit and prepend the prefix to the symbol.

```ts
const microgram = gram.withSiPrefix('μ');
microgram(2.13).toString();  // 2.13μg
```

The supported SI prefixes are enumerated in `unit.SiPrefix`.

## Defining new Dimensions

We provide units and dimensions for all SI base units and for many derived
units and these can be used as building blocks for defining many other units.

Sometimes, you’ll find yourself wanting to define units for a new substance or
“thing” though.

Measurable things are defined through “dimensions”. In scientific literature a
dimension is often denoted with capital letters and square brackets. For
example, the dimension of length is often denoted as <code>[L]</code>, that of
area as <code>[L]<sup>2</sup></code> and that of speed as
<code>[L][T]<sup>-1</sup></code>.

We ensure type safety by encoding the dimensions of units and quantities as
[TypeScript Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types).
For example, the dimension mentioned above are defined as:

```ts
type Length = {length: 1};
type Area = {length: 2};
type Speed = {length: 1, time: -1};
```

To define a new dimension, start by defining a literal type for it. You’ll
also need to define a constant for it that can be used at runtime, since
TypeScript types all disappear after compilation. For example, if you would
like to introduce quantities of money you might write:

```ts
// In money/dimension.ts
export type Money = {money: 1};
export const Money: Money = {money: 1};
```

We use a convention that we use the same capitalization for the type and for
the constant value since it allows us (in most cases) to just forget about
whether we are using the type or the value. We also store the dimension in a
`dimension.ts` alongside the units so that we can distinguish `Length` as a
dimension vs. a `Length` as an amount of a quantity.

Next, you will want to define a base unit for the dimension. Let’s take the
USD as the base unit:

```ts
// In money/units.ts
import * as dimension from './dimension';
export type Money = Quantity<dimension.Money>;
export const usd: Unit<dimension.Money> = makeUnit('$', dimension.Money);
```

You can now use your new dimension and unit to define quantities:

```ts
const pleaseDonateToACharityOfYourChoice: Money = usd(10);
```
