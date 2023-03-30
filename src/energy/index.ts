import * as dimension from './dimension';
import {Quantity, Unit} from '../unit';
import {kilograms} from '../mass';
import {meters} from '../length';
import {seconds} from '../time';

/** A quantity of energy. */
export type Energy<NumberType = number> = Quantity<
  NumberType,
  dimension.Energy
>;

/** The joule, symbol `J`, is the SI unit for energy. */
export const joules: Unit<number, dimension.Energy> = kilograms
  .times(meters.squared())
  .per(seconds.squared())
  .withSymbol('J');
