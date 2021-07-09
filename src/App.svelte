<script lang="ts">
	let interval;
	let run = false;
	let isBreak = false;
	let debt = false;

	let input = [0, 0, 0, 0];

	let time = localStorage.getItem('time') ? new Date(localStorage.getItem('time')) : null;
	$: time ? localStorage.setItem('time', ''+time) : localStorage.removeItem('time');

	let [workTime, breakTime] = localStorage.getItem('timers') ? JSON.parse(localStorage.getItem('timers')) : [0, 0];
	$: localStorage.setItem('timers', JSON.stringify([workTime, breakTime]));

	let ratio = localStorage.getItem('ratio') ? JSON.parse(localStorage.getItem('ratio')) : [5, 1];
	$: localStorage.setItem('ratio', JSON.stringify(ratio));
	
	let logs: Log[] = localStorage.getItem('logs') ? JSON.parse(localStorage.getItem('logs')) : [];
	$: localStorage.setItem('logs', JSON.stringify(logs));

	if (localStorage.getItem('total')) {
		let total = +localStorage.getItem('total');
		let timer = +localStorage.getItem('timer');
		alert('It looks like you\'re using an older verison. I\'ll do my best to convert your session!');
		
		try {
			workTime = 0;
			breakTime = 0;

			if (timer > 0) {
				workTime += timer;
				total -= timer;
			} else if (timer < 0) {
				timer = Math.abs(timer);
				breakTime += timer/(ratio[0]/ratio[1]);
				total -= timer/(ratio[0]/ratio[1]);
			}

			workTime += Math.round((total*ratio[0])/(ratio[0]+ratio[1]));
			breakTime += Math.round(total-(total*ratio[0])/(ratio[0]+ratio[1]));

			localStorage.removeItem('timer');
			localStorage.removeItem('total');
		} catch (error) {
			alert('I\'m having trouble converting your session. Try clearing your cache & cookies.');
			console.error(error);
		}
	}

	interface Log {
		timestamp: Date,
		timers: [number, number],
		action: 'break' | 'work' | 'start' | 'stop' | 'clear' | 'edit'
	};

	const addLog = (action: Log['action']) => {
		logs = [{timestamp: new Date(), timers: [workTime, breakTime], action}, ...logs];
	};

	const toggle = () => {
		if (run) { // Stop timer
			addLog('stop');
			clearInterval(interval);
		} else { // Start timer
			addLog('start');
			if (!time) time = new Date();
			interval = setInterval(() => {
				if (isBreak) {
					breakTime += 1;
				} else {
					workTime += 1;
				}

				update();
			}, 1000);
		}
		run = !run;
	};

	$: debt = (workTime*ratio[1]) < (breakTime*ratio[0]);
	
	const update = () => {
		input[0] = Math.trunc(workTime/60);
		input[1] = Math.trunc(workTime%60);
		input[2] = Math.trunc(breakTime/60);
		input[3] = Math.trunc(breakTime%60);
	};

	const clear = () => {
		logs = [];
		addLog('clear');
		workTime = 0;
		breakTime = 0;
		time = null;
		debt = false;
	};

	const format = (seconds, hideAll = false) => {
		let isNegative = seconds < 0;
		seconds = Math.abs(seconds);

		let h = Math.trunc(seconds / 60 / 60);
		let m = Math.trunc(seconds / 60 % 60);
		let s = Math.trunc(seconds % 60);

		if (hideAll) return `${isNegative ? '-' : ''}${h ? (h + 'h ') : ''}${m ? m + 'm ' : ''}${s || 0}s`;
		else return `${isNegative ? '-' : ''}${h ? (h + 'h ') : ''}${m}m ${s < 10 ? '0' + s : s}s`;
	};

	const switchMode = () => {
		isBreak = !isBreak;
		addLog(isBreak ? 'break' : 'work');
	};
	
	const edit = (type: 'work' | 'break') => {
		const i = Number(type === 'break');
		const m = input[i*2];
		const s = input[i*2 + 1];
		if (type === 'work') workTime = m*60 + s;
		else if (type === 'break') breakTime = m*60 + s;
		
		addLog('edit');
	};

	update();
</script> 

<svelte:head>
	<title>{format(isBreak ? breakTime*(ratio[1]/ratio[0]) : workTime) + (isBreak ? ' - Break ' : ' - Work ')} | Ratio Timer</title>
</svelte:head>

<main>
	<div>
		<div class:break={isBreak} class="pointer"><span>▶</span></div>
		<h1 class:red={debt}>Work: {format(workTime)} {(breakTime*ratio[0]) - (workTime*ratio[1]) > 0 ? `(-${format((breakTime*ratio[0]) - (workTime*ratio[1]), true)})` : ''}</h1>
		<h1 class:red={debt}>Break: {format(breakTime)} {(workTime/ratio[0])*ratio[1] - breakTime >= 1 ? `(+${format((workTime/ratio[0])*ratio[1] - breakTime, true)})` : ''}</h1>
		<br>
		<h2>Total: {format(workTime + breakTime)} (work + break)</h2>
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
		<button on:click={switchMode}>{isBreak ? 'Do Work' : 'Do Break'}</button>
	</div>
	<details style="text-align: center;">
		<summary>Edit Time</summary>
		<div>
			Work: <input type="number" on:change={()=>edit('work')} bind:value={input[0]}>m <input type="number" on:change={()=>edit('work')} bind:value={input[1]}>s<br>
			Break: <input type="number" on:change={()=>edit('break')} bind:value={input[2]}>m <input type="number" on:change={()=>edit('break')} bind:value={input[3]}>s
			<p>Be sure to pause/stop the timer before editing the time!</p>
		</div>
	</details>
	<details class="logs">
		<summary>Logs</summary>
		<div>
			{#each logs as log}
				<p>{new Date(log.timestamp).toLocaleTimeString()} - Action: "{log.action}"<br>{format(log.timers[0])} work<br>{format(log.timers[1])} break</p>
			{/each}
		</div>
	</details>
	<div class="info">
		<h3>To use:</h3>
		<ul>
			<li>Set the ratio betweek work time and break time (default 5 to 1). Next, click "Start" to begin working!</li>
			<li>To switch between work and break, hit the "Do (Work|Break)" button.</li>
			<li>The site will save the session to your device in case you accidentally close or refresh.</li>
			<li>Use the "Clear" button to reset your session.</li>
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
		width: calc(100% + 3rem);
		height: 3rem;
		align-items: center;
		background-color: #355273;
		z-index: -1;
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

	.logs {
		text-align: center;
		margin-top: 1rem;
	}

	.info {
		margin-top: 1rem;
	}

	.info li {
		margin: 0.6rem 0;
	}
</style>