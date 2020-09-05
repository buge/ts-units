import {Quantity, Unit, makeUnit} from './unit';
import {Mass as MassDimension} from './dimension';

export type Mass = Quantity<MassDimension>;
export const kg: Unit<MassDimension> = makeUnit('kg', MassDimension);
export const g: Unit<MassDimension> = kg.scaled('g', 1e3);
