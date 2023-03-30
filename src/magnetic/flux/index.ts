import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {amperes} from '../../electric/current';
import {kilograms} from '../../mass';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of magnetic flux. */
export type Flux<NumberType = number> = Quantity<NumberType, dimension.Flux>;

/** The weber, symbol `Wb`, is the SI unit for magnetic flux. */
export const webers: Unit<number, dimension.Flux> = kilograms
  .times(meters.squared())
  .per(seconds.squared())
  .per(amperes)
  .withSymbol('Wb');
