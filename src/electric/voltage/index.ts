import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {amperes} from '../current';
import {kilograms} from '../../mass';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of voltage. */
export type Voltage<NumberType = number> = Quantity<
  NumberType,
  dimension.Voltage
>;

/** The volt, symbol `V`, is the SI unit for voltage. */
export const volts: Unit<number, dimension.Voltage> = kilograms
  .times(meters.squared())
  .per(seconds.cubed())
  .per(amperes)
  .withSymbol('V');
