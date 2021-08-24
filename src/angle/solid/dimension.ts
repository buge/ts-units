/**
 * An artificial dimension for solid angles. Solid angles are actually a
 * dimensionless quantity (`[L]^2/[L]^2`) but modeling them with a dimension
 * allows us to provide some type safety that prevents, say, a solid angle to
 * be assigned to a scalar property.
 */
export type SolidAngle = {angle: 2};
export const SolidAngle: SolidAngle = {angle: 2};
