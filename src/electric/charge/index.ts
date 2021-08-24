import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {ampere} from '../current';
import {seconds} from '../../time';

/** A quantity of electric charge. */
export type Charge = Quantity<dimension.Charge>;

/** The coulomb, symbol `C`, is the SI unit for electric charge. */
export const coulomb: Unit<dimension.Charge> = ampere
  .times(seconds)
  .withSymbol('C');
