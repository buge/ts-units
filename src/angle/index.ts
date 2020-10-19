import * as dimension from './dimension';
import {Quantity, makeUnit} from '../unit';

export type Angle = Quantity<dimension.Angle>;

export const radians = makeUnit('rad', dimension.Angle);
export const degrees = radians.times(Math.PI / 180).withSymbol('º');

export const turns = radians.times(2 * Math.PI).withSymbol('τ');

/**
 * Returns the sine of an angle.
 * @param x An Angle
 */
export const sin = liftUnary(Math.sin);

/**
 * Returns the cosine of an angle.
 * @param x An Angle
 */
export const cos = liftUnary(Math.cos);

/**
 * Returns the tangent of an angle.
 * @param x An Angle
 */
export const tan = liftUnary(Math.tan);

/**
 * Returns the arcsine of a number.
 * @param x A numeric expression.
 */
export const asin = liftRet(Math.asin);

/**
 * Returns the arc cosine (or inverse cosine) of a number.
 * @param x A numeric expression.
 */
export const acos = liftRet(Math.acos);

/**
 * Returns the arctangent of a number.
 * @param x A numeric expression.
 */
export const atan = liftRet(Math.atan);

/**
 * Returns the angle from the X axis to a point.
 *
 * @param x A numeric expression representing the cartesian x-coordinate.
 * @param y A numeric expression representing the cartesian y-coordinate.
 */
export function atan2(x: number, y: number): Angle {
  return radians(Math.atan2(x, y));
}

function liftRet(f: (x: number) => number): (x: number) => Angle {
  return x => radians(f(x));
}

function liftUnary(f: (x: number) => number): (x: Angle) => number {
  return x => f(x.in(radians).amount);
}
