import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {amperes} from '../current';
import {kilograms} from '../../mass';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of electrical resistance. */
export type Resistance<NumberType = number> = Quantity<
  NumberType,
  dimension.Resistance
>;

/** The ohm, symbol `Ω`, is the SI unit for electrical resistance. */
export const ohms: Unit<number, dimension.Resistance> = kilograms
  .times(meters.squared())
  .per(seconds.cubed())
  .per(amperes.squared())
  .withSymbol('Ω');
