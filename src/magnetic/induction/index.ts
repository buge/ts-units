import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {ampere} from '../../electric/current';
import {kilogram} from '../../mass';
import {seconds} from '../../time';

/** A quantity of magnetic induction. */
export type Induction = Quantity<dimension.Induction>;

/** The tesla, symbol `T`, is the SI unit for magnetic induction. */
export const tesla: Unit<dimension.Induction> = kilogram
  .per(seconds.squared())
  .per(ampere)
  .withSymbol('T');
