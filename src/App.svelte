<script>
	let interval;
	let run = false;
	let isBreak = false;

	let time = localStorage.getItem('time') ? new Date(localStorage.getItem('time')) : null;
	$: time ? localStorage.setItem('time', ''+time) : localStorage.removeItem('time');

	let total = +localStorage.getItem('total') || 0;
	$: localStorage.setItem('total', total.toString());

	let timer = +localStorage.getItem('timer') || 0;
	$: localStorage.setItem('timer', timer.toString());

	let ratio = localStorage.getItem('ratio') ? JSON.parse(localStorage.getItem('ratio')) : [5, 1];
	$: localStorage.setItem('ratio', JSON.stringify(ratio));

	const toggle = () => {
		if (run) { // Stop timer
			clearInterval(interval);
		} else { // Start timer
			if (!time) time = new Date();
			interval = setInterval(() => {
				if (isBreak) timer -= ratio[0] / ratio[1];
				else timer += 1;
				total += 1;
			}, 1000);
		}
		run = !run;
	};

	const clear = () => {
		timer = 0;
		total = 0;
		time = null;
	};

	const format = (seconds) => {
		let isNegative = seconds < 0;
		seconds = Math.abs(seconds);

		let h = Math.trunc(seconds / 60 / 60);
		let m = Math.trunc(seconds / 60);
		let s = Math.trunc(seconds % 60);
		return `${isNegative ? '-' : ''}${h ? (h + 'h') : ''}${m}m ${s < 10 ? '0' + s : s}s`;
	};
</script>

<main>
	<div>
		<h1 class:live={!isBreak}>Work: {format(timer)}</h1>
		<h1 class:live={isBreak}>Break: {format(timer*(ratio[1]/ratio[0]))}</h1>
		<h2>Total: {format(total)} (work + break)</h2>
		<h2>Net: {format(total + (timer < 0 ? timer : 0))} (total - work debt)</h2>
		<h2>Started: {time?.toLocaleTimeString() || 'null'}</h2>
	</div>
	<div>
		Work: <input type="number" bind:value={ratio[0]}><br>
		Break: <input type="number" bind:value={ratio[1]}>
	</div>
	<div>
		<button on:click={clear}>Clear</button>
		<button on:click={toggle}>{!time ? (run ? 'Stop' : 'Start') : (run ? 'Pause' : 'Resume')}</button>
		<button on:click={()=>isBreak = !isBreak}>{isBreak ? 'Do Work' : 'Do Break'}</button>
	</div>
</main>

<style>
	main {
		font-family: Arial, Helvetica, sans-serif;
	}

	.live {
		color: red;
	}
</style>