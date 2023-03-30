import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {candelas} from '../intensity';
import {steradians} from '../../angle/solid';

/** A quantity of luminous flux. */
export type Flux<NumberType = number> = Quantity<NumberType, dimension.Flux>;

/** The lumen, symbol `lm`, is the SI unit for luminous flux. */
export const lumens: Unit<number, dimension.Flux> = candelas
  .times(steradians)
  .withSymbol('lm');
