# Physical Units for TypeScript

`ts-units` is a package for modeling typed physical units in TypeScript.

Basic examples:

```
import {Length, kilometers, meters, yards} from 'ts-units/length';
import {Length, seconds, hours} from 'ts-units/time';
import {Speed} from 'ts-units/speed';

const length: Length = yards(120);
console.log(length.toString());  // 120yd
console.log(length.in(meters).toString());  // 109.7m

const time: Time = seconds(4);
const speed: Speed = length.per(time);
console.log(speed.in(kilometers.per(hour)));  // 98.8km/h
```

## Installation

TODO(bunge): Write this section

## Introduction

TODO(bunge): Write this section

## Defining new Units

TODO(bunge): Write this section

## Type Safety

TODO(bunge): Write this section

## Defining new Dimensions

TODO(bunge): Write this section
