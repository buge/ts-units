import {Quantity, Unit, makeUnit} from './unit';
import {Temperature as T} from './dimension';

export type Temperature = Quantity<T>;
export const kelvin: Unit<T> = makeUnit('K', T);

export const celsius: Unit<T> = kelvin.scaled('ºC', 1, -273.15);
export const fahrenheit: Unit<T> = kelvin.scaled('ºF', 9/5, -459.67);
export const rankine: Unit<T> = kelvin.scaled('ºR', 1.8);