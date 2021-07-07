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
		return `${isNegative ? '-' : ''}${h ? (h + 'h ') : ''}${m}m ${s < 10 ? '0' + s : s}s`;
	};
</script>

<svelte:head>
	<title>{format(isBreak ? timer*(ratio[1]/ratio[0]) : timer) + (isBreak ? ' - Break ' : ' - Work ')} | Ratio Timer</title>
</svelte:head>

<main>
	<div>
		<div class:break={isBreak} class="pointer"><span>▶</span></div>
		<h1 class:red={timer < 0}>Work: {format(timer)}</h1>
		<h1 class:red={timer < 0}>Break: {format(timer*(ratio[1]/ratio[0]))}</h1>
		<br>
		<h2>Total: {format(total)} (work + break)</h2>
		<h2>Net: {format(total + (timer < 0 ? timer : 0))} (total - work debt)</h2>
		<h2>Started: {time?.toLocaleTimeString() || 'null'}</h2>
		<br>
	</div>
	<div class="controls">
		<span>Work:</span> <input type="number" bind:value={ratio[0]}>
		<span>to</span>
		<span>Break:</span> <input type="number" bind:value={ratio[1]}>
	</div>
	<div class="buttons">
		<button on:click={clear}>Clear</button>
		<button on:click={toggle}>{!time ? (run ? 'Stop' : 'Start') : (run ? 'Pause' : 'Resume')}</button>
		<button on:click={()=>isBreak = !isBreak}>{isBreak ? 'Do Work' : 'Do Break'}</button>
	</div>
	<details style="text-align: center;">
		<summary>Edit Time</summary>
		<div>
			<input type="number" bind:value={timer} style="width: 40%">
iv class="info">
		<h3>To use:</h3>
		<ul>
			<li>Set the ratio betweek work time and break time (default 5 to 1). Next, click "Start" to begin working!</li>
			<li>To switch between work and break, hit the "Do (Work|Break)" button.</li>
			<li>The site will save the session to your device in case you accidentally close or refresh.</li>
			<li>Use the "Clear" button to reset your session.</li>
			<li>"Net" is the difference between the total hours (work + break) and "work debt" (timer will be negative & red)</li>
			<li>^ On average, "Total" and "Net" will be the same. They will only diverge when you take too long of a break!</li>
		</ul>
	</div>
</main>

<style>
	main {
		font-family: Arial, Helvetica, sans-serif;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 1.2rem;
		width: min(90vw, 60vh);
		margin: 0 auto;
	}

	.pointer {
		display: flex;
		position: relative;
		top: 4.4rem;
		left: -2rem;
		transition: top 100ms ease-out;
		width: 100%;
		height: 3rem;
		align-items: center;
		background-color: #1e3550;
		mix-blend-mode: screen;
	}
	.pointer.break {
		top: 8.8rem;
	}

	.pointer > span {
		margin-bottom: 2px;
		margin-left: 0.2rem;
	}

	h1 {
		transition: color 100ms ease-out;
	}
	.red {
		color: rgb(255, 74, 74);
	}

	h2, .info {
		color: #BABEC2;
	}

	.controls {
		display: grid;
		grid-template-columns: 1fr 1fr 3fr 1fr 1fr;
		text-align: center;
	}

	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		width: 100%;
	}

	.controls > span {
		align-self: center;
	}

	input, button, span {
		font-size: 1.4rem;
	}

	input, button {
		font-family: inherit;
		background-color: #202831;
		border: 1px solid #818385;
		color: white;
		border-radius: 3px;
		margin: 1rem 0.4rem;
		padding: 0.4rem 0.6rem;
		transition: background-color 100ms ease-out, border 100ms ease-out;
		outline: none;
	}

	input {
		width: 4rem;
	}

	button, summary {
		cursor: pointer;
	}
	button:hover, input:focus {
		background-color: #343d47;
		border: 1px solid #c6ccd3;
	}

	.info {
		margin-top: 1rem;
	}

	.info li {
		margin: 0.6rem 0;
	}
</style>