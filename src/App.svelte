<script lang="ts">
	let isPaused = true;
	let isWorking = true;

	let workRatio = 1;
	let breakRatio = 5;

	let totalWorkTime = 0;
	let totalBreakTime = 0;

	$: totalTime = totalWorkTime + totalBreakTime;
	$: relativeTime = (totalWorkTime - totalBreakTime);

	$: relativeWorkTime = relativeTime * workRatio;
	$: relativeBreakTime = relativeTime / breakRatio;

	setInterval(() => {
		if(!isPaused) {
			if(isWorking) totalWorkTime++;
			else totalBreakTime++;
		}
	}, 1000);

	const clear = () => {
		totalWorkTime = 0;
		totalBreakTime = 0;
	};

	const format = (seconds: number) => {
		const isNegative = seconds < 0;
		seconds = Math.abs(seconds);

		const h = Math.trunc(seconds / 60 / 60);
		const m = Math.trunc(seconds / 60 % 60);
		const s = Math.trunc(seconds % 60);
		return `${isNegative ? '-' : ''}${h ? (h + 'h ') : ''}${m}m ${s < 10 ? '0' + s : s}s`;
	};
</script>

<svelte:head>
	<title>{format(isWorking ? relativeWorkTime : relativeBreakTime) + (isWorking ? ' - Work ' : ' - Break ')} | Ratio Timer</title>
</svelte:head>

<main>
	<div>
		<div class:break={!isWorking} class="pointer"><span>▶</span></div>
		<h1 class:red={relativeWorkTime < 0}>Work: {format(relativeWorkTime)}</h1>
		<h1 class:red={relativeBreakTime < 0}>Break: {format(relativeBreakTime)}</h1>
		<br>
		<h2>Total: {format(totalTime)} (work + break)</h2>
		<h2>Net: {format(totalTime + (relativeWorkTime < 0 ? relativeWorkTime : 0))} (total - work debt)</h2>
		<!-- <h2>Started: {time?.toLocaleTimeString() || 'null'}</h2> -->
		<br>
	</div>
	<div class="controls">
		<span>Work:</span> <input type="number" bind:value={workRatio}>
		<span>to</span>
		<span>Break:</span> <input type="number" bind:value={breakRatio}>
	</div>
	<div class="buttons">
		<button on:click={clear}>Clear</button>
		<button on:click={() => isPaused = !isPaused}>{isPaused ? "Start" :  "Stop"}</button>
		<button on:click={() => isWorking = !isWorking}>{isWorking ? 'Do Break' : 'Do Work'}</button>
	</div>
	<details style="text-align: center;">
		<summary>Edit Time Worked</summary>
		<div>
			<input type="number" disabled={!isPaused} bind:value={totalWorkTime} style="width: 40%">
			{#if !isPaused}
				<p>Pause the timer to edit the time.</p>
			{/if}
		</div>
	</details>
	<div class="info">
		<h3>To use:</h3>
		<ul>
			<li>Set the ratio betweek work time and break time (default 1 to 5). Next, click "Start" to begin working!</li>
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