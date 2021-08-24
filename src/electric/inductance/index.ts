import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {amperes} from '../current';
import {kilograms} from '../../mass';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of electrical inductance. */
export type Inductance = Quantity<dimension.Inductance>;

/** The henry, symbol `H`, is the SI unit for electrical inductance. */
export const henries: Unit<dimension.Inductance> = kilograms
  .times(meters.squared())
  .per(seconds.squared())
  .per(amperes.squared())
  .withSymbol('H');
