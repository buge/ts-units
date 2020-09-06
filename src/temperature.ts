import {Quantity, makeUnit} from './unit';
import {Temperature as TemperatureDimension} from './dimension';

export type Temperature = Quantity<TemperatureDimension>;
export const kelvin = makeUnit('K', TemperatureDimension);

export const celsius = kelvin.scaled('ºC', 1, -273.15);
export const fahrenheit = kelvin.scaled('ºF', 9/5, -459.67);
export const rankine = kelvin.scaled('ºR', 1.8);