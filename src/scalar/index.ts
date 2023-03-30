import * as dimension from '../dimension';
import {Quantity, makeUnit} from '../unit';

export type Scalar<NumberType = number> = Quantity<NumberType, dimension.One>;
export const scalar = makeUnit('', dimension.One);

export const percent = scalar.times(1e-2).withSymbol('%');
export const permille = scalar.times(1e-3).withSymbol('‰');
export const permyriad = scalar.times(1e-4).withSymbol('‱');
