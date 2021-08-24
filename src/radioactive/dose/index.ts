import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of a radioactive dose. */
export type Dose = Quantity<dimension.Dose>;

/** The gray, symbol `Gy`, is the SI unit for absorbed dose. */
export const gray: Unit<dimension.Dose> = meters
  .squared()
  .per(seconds.squared())
  .withSymbol('Gy');

/** The sievert, symbol `Sv`, is the SI unit for equivalent dose. */
export const sievert: Unit<dimension.Dose> = meters
  .squared()
  .per(seconds.squared())
  .withSymbol('Sv');
