import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {ampere} from '../current';
import {kilogram} from '../../mass';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of electrical inductance. */
export type Inductance = Quantity<dimension.Inductance>;

/** The henry, symbol `H`, is the SI unit for electrical inductance. */
export const henry: Unit<dimension.Inductance> = kilogram
  .times(meters.squared())
  .per(seconds.squared())
  .per(ampere.squared())
  .withSymbol('H');
