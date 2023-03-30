import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {amperes} from '../../electric/current';
import {kilograms} from '../../mass';
import {seconds} from '../../time';

/** A quantity of magnetic induction. */
export type Induction<NumberType = number> = Quantity<
  NumberType,
  dimension.Induction
>;

/** The tesla, symbol `T`, is the SI unit for magnetic induction. */
export const teslas: Unit<number, dimension.Induction> = kilograms
  .per(seconds.squared())
  .per(amperes)
  .withSymbol('T');
