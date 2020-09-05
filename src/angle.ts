import {Quantity, Unit, makeUnit} from './unit';
import {One} from './dimension';

export type Angle = Quantity<One>;
export const radians: Unit<One> = makeUnit('rad', One);
export const degrees: Unit<One> = radians.scaled('º', 180 / Math.PI);

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

function liftRet(f: (x: number) => number): (x: number) => Angle {
  return x => radians(f(x))
}

function liftUnary(f: (x: number) => number): (x: Angle) => number {
  return x => f(x.in(radians).amount)
}
