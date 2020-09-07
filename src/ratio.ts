import {Quantity, Unit, makeUnit} from './unit';
import * as dimension from './dimension';

export type Scalar = Quantity<dimension.One>;
export const value = makeUnit('', dimension.One);

export const percent = value.scaled(100).withSymbol('%');
export const permille = value.scaled(1000).withSymbol('‰');
export const permyriad = value.scaled(10000).withSymbol('‱');
