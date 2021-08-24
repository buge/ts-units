# Physical Units for TypeScript

![CI Build](https://github.com/buge/ts-units/actions/workflows/node.js.yml/badge.svg)

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
meters(1) < feet(4);
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
celsius(23.1).toString(); // '23.1ºC'
```

For custom formatting, the amount and symbol can be easily extracted from the
quantity:

```ts
const temp = celsius(23.1);
const html =
  `<span class="amount">${temp.amount.toFixed(1)}</span>` +
  `<span class="symbol">${temp.unit.symbol}</span>`;
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
meters(1) < feet(4);
```

Because of the inprecision in floating point arithmetics, you should prefer to
use the `isCloseTo` method when checking a quantity for equality:

```ts
// Returns whether 1m is within 0.01 feet of 3.28 feet.
meters(1).isCloseTo(feet(3.28), 0.01);
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
const length: Length = meters(5).times(percent(10)); // 0.5m
```

You can square quantities and take their reciprocal:

```ts
const area: Area = meters(3).squared();
const frequency: Frequency = seconds(3).reciprocal();
```

You can use the relationship between quantities to define unit conversions:

```ts
const riceDensity = grams(220).per(cup);
const iNeed = grams(500).per(riceDensity).in(ounce);
```

## Built-in Units

Here’s a reference of all units that we currently have built-in to the library.

### Planar Angles

```ts
import {Angle, degrees, sin} from '@buge/ts-units/angle';
const angle: Angle = degrees(30);
const s = sin(angle);
```

**Units:**\
radians, degrees, turns

**Trigonometric Functions:**\
sin, cos, tan, asin, acos, atan, atan2

### Solid Angles

```ts
import {SolidAngle, steradians} from '@buge/ts-units/angle/solid';
const angle: SolidAngle = steradians(1);
```

**Units:**\
steradians, squareDegrees

### Electrical Capacitance

```ts
import {Capacitance, microfarads} from '@buge/ts-units/eletric/capacitance';
const capacitance: Capacitance = microfarads(4700);
```

**Units:**\
farads, microfarads, nanofarads, picofarads

### Electric Charge

```ts
import {Charge, coulombs} from '@buge/ts-units/eletric/charge';
const charge: Charge = coulombs(5000);
```

**Units:**\
coulombs

### Electrical Conductance

```ts
import {Conductance, siemens} from '@buge/ts-units/eletric/conductance';
const conductance: Conductance = siemens(0.2);
```

**Units:**\
siemens

### Electrical Current

```ts
import {Current, amperes} from '@buge/ts-units/eletric/current';
const current: Current = amperes(10);
```

**Units:**\
amperes

### Electrical Inductance

```ts
import {Inductance, henries} from '@buge/ts-units/eletric/inductance';
const inductance: Inductance = henries(1);
```

**Units:**\
henries

### Electrical Resistance

```ts
import {Resistance, ohms} from '@buge/ts-units/eletric/resistance';
const resistance: Resistance = ohms(560);
```

**Units:**\
ohms

### Electric Voltage

```ts
import {Voltage, volts} from '@buge/ts-units/eletric/voltage';
const voltage: Voltage = volts(220);
```

**Units:**\
volts

### Energy

```ts
import {Energy, joules} from '@buge/ts-units/energy';
const energy: Energy = joules(4.1868);
```

**Units:**\
joules

### Force

```ts
import {Force, newtons} from '@buge/ts-units/force';
const force: Force = newtons(608);
```

**Units:**\
newtons

### Frequency

```ts
import {Frequency, hertz} from '@buge/ts-units/force';
const frequency: Frequency = hertz(608);
```

**Units:**\
hertz

### Length

```ts
import {Length, meters} from '@buge/ts-units/length';
const length: Length = meters(5);
```

**Metric Units:**\
meters, kilometers, centimeters, millimeters, micrometers, nanometers,
picometers, femtometers, fermi, angstroms, microns

**Imperial Units:**\
yards, feet, inches, chains, furlongs, miles

**Marine Units:**\
fathoms, nauticalMiles

**Astronomical Units:**\
astronomicalUnits

### Luminous Flux

```ts
import {Flux, lumes} from '@buge/ts-units/luminous/flux';
const flux: Flux = lumens(800);
```

**Units:**\
lumens

### Illuminance

```ts
import {Illuminance, lux} from '@buge/ts-units/luminous/illuminance';
const illuminance: Illuminance = lux(35000);
```

**Units:**\
lux

### Luminous Intensity

```ts
import {Intensity, candelas} from '@buge/ts-units/luminous/intensity';
const intensity: Intensity = candelas(135);
```

**Units:**\
candelas

### Magnetic Flux

```ts
import {Flux, webers} from '@buge/ts-units/magnetic/flux';
const flux: Flux = webers(800);
```

**Units:**\
webers

### Mass

```ts
import {Mass, kilograms} from '@buge/ts-units/mass';
const mass: Mass = kilograms(5);
```

**Units:**\
kilograms, grams

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

### Power

```ts
import {Power, watts} from '@buge/ts-units/power';
const power: Power = watts(800);
```

**Units:**\
watt

### Pressure

```ts
import {Pressure, pascals} from '@buge/ts-units/pressure';
const pressure: Pressure = pascals(101325);
```

**Units:**\
pascals

### Radioactivity

```ts
import {Radioactivity, becquerels} from '@buge/ts-units/radioactive/decay';
const radioactivity: Radioactivity = becquerels(20);
```

**Units:**\
becquerels

### Absorbed and Equivaelnt Doses of Ionizing Radiation

```ts
import {Dose, grays, sieverts} from '@buge/ts-units/radioactive/dose';
const absorbed: Dose = grays(20e-6);
const equivaelnt: Dose = sieverts(1.5e-3);
```

**Units:**\
grays, sieverts

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
units by multiplying them using `time`, dividing them using `per`, squaring
them using `squared` and taking their reciprocal using `reciprocal`.

```ts
const knots: Unit<Speed> = nauticalMiles.per(hours).withSymbol('kn');
const mps2: Unit<Acceleration> = meters
  .per(seconds.squared())
  .withSymbol('m/s²');
```

As shown above, you can configure the symbol for the unit using `withSymbol`
that will be suffixed to the amount when printing a quantity using
`toString()`. You can provide any arbitrary string. The symbol can be retrieved
from the unit using the `.symbol` property or from a quantity using
`.unit.symbol`.

We provide a dedicated method to create derived units with SI prefix that both
scale the unit and prepend the prefix to the symbol.

```ts
const micrograms = gram.withSiPrefix('μ');
micrograms(2.13).toString(); // 2.13μg
```

The supported SI prefixes are enumerated in `unit.SiPrefix`.

## Defining new Dimensions

We provide units and dimensions for all SI base units and for many derived
units. These can be used as building blocks for defining many other units.

Sometimes, you’ll find yourself wanting to define units for a new substance or
“thing” though.

<!-- prettier-ignore -->
Measurable things are defined through “dimensions”. In scientific literature a
dimension is often denoted with capital letters and square brackets. For
example, the dimension of length is often denoted as <code>[L]</code>, that of
area as <code>[L]<sup>2</sup></code> and that of speed as
<code>[L][T]<sup>-1</sup></code>.

<!-- prettier-ignore-end -->

We ensure type safety by encoding the dimensions of units and quantities as
[TypeScript Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types).
For example, the dimension mentioned above are defined as:

```ts
type Length = {length: 1};
type Area = {length: 2};
type Speed = {length: 1; time: -1};
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
US dollar as the base unit:

```ts
// In money/units.ts
import * as dimension from './dimension';
export type Money = Quantity<dimension.Money>;
export const dollars: Unit<dimension.Money> = makeUnit('$', dimension.Money);
```

You can now use your new dimension and unit to define quantities:

```ts
const pleaseDonateToACharityOfYourChoice: Money = usd(10);
```

## Limitations

### Lack of Kinds

Two types are compatible if they share the same dimensions. That is, they can
be reduced to the same base unit equivalents. This can mean that some things
may be compatible when the actually should not be:

```ts
setFrequency(hertz(100));
setFrequency(becquerels(100));

radiationAlarm(grays(2));
radiationAlarm(sieverts(2));
```

_ISO 80000-1:2009(E)_ defines these as separate “kinds” but we currently
provide no way to check for the kind of a quantity at compile time or
runtime.

In some cases we have taken the liberty to model the kind of a quantity as a
different unit, specifically with planar angles and solid angles. While these
are strictly a dimensionless quantity of `[L]/[L]` and `[L]^2/[L]^2`
respectively, we model these as:

```ts
type Angle = {angle: 1};
type SolidAngle = {angle: 2};
```
