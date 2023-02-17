/**
 * Computes the scale denominator of an aerial photograph, given the image distance
 * and ground distance.
 * @param imageDistance The distance in meters between two points on the image.
 * @param groundDistance The distance in meters between the same two points on the ground.
 */
export function scaleDenominator(
	imageDistance: number,
	groundDistance: number
): number {
	return groundDistance / imageDistance;
}

/**
 * Computes the scale denominator of an aerial photograph from the flying height
 * and focal length.
 * @param focalLength The focal length of the sensor, in meters.
 * @param flyingHeight The flying height of the sensor, in meters.
 */
export function scaleDenominatorFlyingHeight(
	focalLength: number,
	flyingHeight: number
): number {
	return flyingHeight / focalLength;
}

/**
 * Computes the relief distance from the flying height, relief height and nadir distance.
 * @param flyingHeight The flying height of the sensor, in meters.
 * @param reliefHeight The relief height, in meters.
 * @param nadirDistance The nadir distance of the sensor, in meters.
 */
export function reliefDistance(
	flyingHeight: number,
	reliefHeight: number,
	nadirDistance: number
): number {
	return (reliefHeight / flyingHeight) * nadirDistance;
}

/**
 * Calculates the ground sampling distance from the scanning resolution and scale denominator.
 * @param scanningResolution The scanning resolution of the sensor, in dots per inch.
 * @param scaleDenominator The scale denominator of the aerial photograph.
 */
export function groundSamplingDistance(
	scanningResolution: number,
	scaleDenominator: number
): number {
	const pixelSize = 25.4 / scanningResolution;
	return (pixelSize * scaleDenominator) / 1000;
}
