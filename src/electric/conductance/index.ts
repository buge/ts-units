import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {amperes} from '../current';
import {kilograms} from '../../mass';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of electrical conductance. */
export type Conductance = Quantity<dimension.Conductance>;

/** The siemens, symbol `Ω`, is the SI unit for electrical conductance. */
export const ohms: Unit<dimension.Conductance> = seconds
  .cubed()
  .times(amperes.squared())
  .per(kilograms)
  .per(meters.squared())
  .withSymbol('S');
