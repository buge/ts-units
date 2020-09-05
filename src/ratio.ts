import {Quantity, Unit, makeUnit} from './unit';
import {One} from './dimension';

export type Ratio = Quantity<One>;
export const ratio: Unit<One> = makeUnit('', One);

export const percent: Unit<One> = ratio.scaled('%', 100);
