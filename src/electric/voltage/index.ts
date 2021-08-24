import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {ampere} from '../current';
import {kilogram} from '../../mass';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of voltage. */
export type Voltage = Quantity<dimension.Voltage>;

/** The volt, symbol `V`, is the SI unit for voltage. */
export const volt: Unit<dimension.Voltage> = kilogram
  .times(meters.squared())
  .per(seconds.cubed())
  .per(ampere)
  .withSymbol('V');
