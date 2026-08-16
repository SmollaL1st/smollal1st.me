<script lang="ts">
	interface Props {
		class?: string;
		height?: number;
		strokeWidth?: number;
		color?: string;
		margin?: string;
	}

	let {
		class: className = '',
		height = 14,
		strokeWidth = 2,
		color = 'var(--elevation-border)',
		margin = '0'
	}: Props = $props();
</script>

<div
	class="m3-wavy-divider {className}"
	style="--wave-height: {height}px; --wave-stroke: {strokeWidth}px; --wave-color: {color}; --wave-margin: {margin};"
	aria-hidden="true"
>
	<svg
		viewBox="0 0 1200 24"
		preserveAspectRatio="none"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="wavy-svg"
	>
		<path
			d="M 0,12 
			C 15,4 25,4 40,12 
			C 55,20 65,20 80,12 
			C 95,4 105,4 120,12 
			C 135,20 145,20 160,12 
			C 175,4 185,4 200,12 
			C 215,20 225,20 240,12 
			C 255,4 265,4 280,12 
			C 295,20 305,20 320,12 
			C 335,4 345,4 360,12 
			C 375,20 385,20 400,12 
			C 415,4 425,4 440,12 
			C 455,20 465,20 480,12 
			C 495,4 505,4 520,12 
			C 535,20 545,20 560,12 
			C 575,4 585,4 600,12 
			C 615,20 625,20 640,12 
			C 655,4 665,4 680,12 
			C 695,20 705,20 720,12 
			C 735,4 745,4 760,12 
			C 775,20 785,20 800,12 
			C 815,4 825,4 840,12 
			C 855,20 865,20 880,12 
			C 895,4 905,4 920,12 
			C 935,20 945,20 960,12 
			C 975,4 985,4 1000,12 
			C 1015,20 1025,20 1040,12 
			C 1055,4 1065,4 1080,12 
			C 1095,20 1105,20 1120,12 
			C 1135,4 1145,4 1160,12 
			C 1175,20 1185,20 1200,12"
			stroke="var(--wave-color)"
			stroke-width="var(--wave-stroke)"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</div>

<style>
	.m3-wavy-divider {
		width: 100%;
		height: var(--wave-height, 14px);
		display: flex;
		align-items: center;
		overflow: hidden;
		margin: var(--wave-margin, 0);
		opacity: 0.8;
		pointer-events: none;
	}

	.wavy-svg {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
