import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {candela} from '../intensity';
import {steradians} from '../../angle/solid';

/** A quantity of luminous flux. */
export type Flux = Quantity<dimension.Flux>;

/** The lumen, symbol `lm`, is the SI unit for luminous flux. */
export const lumen: Unit<dimension.Flux> = candela
  .times(steradians)
  .withSymbol('lm');
