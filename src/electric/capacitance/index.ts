import * as dimension from './dimension';
import {Quantity, SiPrefix, Unit} from '../../unit';
import {amperes} from '../current';
import {kilograms} from '../../mass';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of electrical capacitance. */
export type Capacitance<NumberType = number> = Quantity<
  NumberType,
  dimension.Capacitance
>;

/** The farad, symbol `F`, is the SI unit for electrical capacitance. */
export const farads: Unit<number, dimension.Capacitance> = seconds
  .squared()
  .squared()
  .times(amperes.squared())
  .per(kilograms)
  .per(meters.squared())
  .withSymbol('F');

export const [microfarads, nanofarads, picofarads] = (
  ['μ', 'n', 'p'] as SiPrefix[]
).map(x => farads.withSiPrefix(x));
