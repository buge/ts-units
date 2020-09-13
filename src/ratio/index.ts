import * as dimension from '../dimension';
import {Quantity, makeUnit} from '../unit';

export type Scalar = Quantity<dimension.One>;
export const value = makeUnit('', dimension.One);

export const percent = value.scaled(100).withSymbol('%');
export const permille = value.scaled(1000).withSymbol('‰');
export const permyriad = value.scaled(10000).withSymbol('‱');
