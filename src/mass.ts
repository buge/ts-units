import {Quantity, makeUnit} from './unit';
import {Mass as MassDimension} from './dimension';

export type Mass = Quantity<MassDimension>;
export const kilogram = makeUnit('kg', MassDimension);

export const gram = kilogram.scaled('g', 1e3);
