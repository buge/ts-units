import * as dimension from './dimension';
import {Quantity, SiPrefix, Unit} from '../../unit';
import {ampere} from '../current';
import {kilogram} from '../../mass';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of electrical capacitance. */
export type Capacitance = Quantity<dimension.Capacitance>;

/** The farad, symbol `F`, is the SI unit for electrical capacitance. */
export const farad: Unit<dimension.Capacitance> = seconds
  .squared()
  .squared()
  .times(ampere.squared())
  .per(kilogram)
  .per(meters.squared())
  .withSymbol('F');

export const [microfarad, nanofarad, picofarad] = (
  ['μ', 'n', 'p'] as SiPrefix[]
).map(x => farad.withSiPrefix(x));
