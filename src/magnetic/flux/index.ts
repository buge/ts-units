import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {ampere} from '../../electric/current';
import {kilogram} from '../../mass';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of magnetic flux. */
export type Flux = Quantity<dimension.Flux>;

/** The weber, symbol `Wb`, is the SI unit for magnetic flux. */
export const weber: Unit<dimension.Flux> = kilogram
  .times(meters.squared())
  .per(seconds.squared())
  .per(ampere)
  .withSymbol('Wb');
