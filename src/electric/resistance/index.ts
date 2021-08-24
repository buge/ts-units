import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {ampere} from '../current';
import {kilogram} from '../../mass';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of electrical resistance. */
export type Resistance = Quantity<dimension.Resistance>;

/** The ohm, symbol `Ω`, is the SI unit for electrical resistance. */
export const ohms: Unit<dimension.Resistance> = kilogram
  .times(meters.squared())
  .per(seconds.cubed())
  .per(ampere.squared())
  .withSymbol('Ω');
