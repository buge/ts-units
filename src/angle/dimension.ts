/**
 * An artificial dimension for planar angles. Angles are actually a
 * dimensionless quantity (`[L]/[L]`) but modeling them with a
 * dimension allows us to provide some type safety that prevents, say,
 * an angle to be assigned to a scalar property.
 */
export type Angle = {angle: 1};
export const Angle: Angle = {angle: 1};
