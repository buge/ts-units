import * as dimension from './dimension';
import {Quantity, Unit} from '../unit';
import {kilograms} from '../mass';
import {meters} from '../length';
import {seconds} from '../time';

/** A quantity of power. */
export type Power = Quantity<dimension.Power>;

/** The watt, symbol `W`, is the SI unit for power. */
export const watts: Unit<dimension.Power> = kilograms
  .times(meters.squared())
  .per(seconds.cubed())
  .withSymbol('W');
