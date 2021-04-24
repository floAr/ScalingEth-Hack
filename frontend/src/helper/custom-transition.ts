import { cubicOut } from 'svelte/easing';

export function expand(node: Element, params: { delay?: 0; duration?: 400; easing?: (t: number) => number; }) {
	const {
		delay = 0,
		duration = 400,
		easing = cubicOut
	} = params;

	const w = parseFloat(getComputedStyle(node).strokeWidth);

	return {
		delay,
		duration,
		easing,
		css: (t: number) => `opacity: ${t}; stroke-width: ${t * w}`
	};
}