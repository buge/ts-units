import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {amperes} from '../../electric/current';
import {kilograms} from '../../mass';
import {seconds} from '../../time';

/** A quantity of magnetic induction. */
export type Induction = Quantity<dimension.Induction>;

/** The tesla, symbol `T`, is the SI unit for magnetic induction. */
export const teslas: Unit<dimension.Induction> = kilograms
  .per(seconds.squared())
  .per(amperes)
  .withSymbol('T');
