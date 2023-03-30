import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {meters} from '../../length';
import {seconds} from '../../time';

/** A quantity of a radioactive dose. */
export type Dose<NumberType = number> = Quantity<NumberType, dimension.Dose>;

/** The gray, symbol `Gy`, is the SI unit for absorbed dose. */
export const grays: Unit<number, dimension.Dose> = meters
  .squared()
  .per(seconds.squared())
  .withSymbol('Gy');

/** The sievert, symbol `Sv`, is the SI unit for equivalent dose. */
export const sieverts: Unit<number, dimension.Dose> = meters
  .squared()
  .per(seconds.squared())
  .withSymbol('Sv');
