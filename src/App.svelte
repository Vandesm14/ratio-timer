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
		action: string
	};

	const addLog = (action: Log['action']) => {
		logs = [{timestamp: new Date(), timers: [workTime, breakTime], action}, ...logs];
	};

	const toggle = (override = !run) => {
    run = !override;
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
    toggle(false);
		logs = [];
		addLog('clear');
		workTime = 0;
		breakTime = 0;
		time = null;
		debt = false;
    input = [0, 0, 0, 0];
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

  const restore = (w, b, i?) => {
    if (!confirm(`Are you sure you want to restore to:\nWork: ${format(w)}\nBreak: ${format(b)}`)) return;
    workTime = w;
    breakTime = b;
    logs = logs.slice(i);
    addLog('restore');
		update();
  }

	update();

	const trimHours = () => {
		addLog('trim');
		workTime = ((workTime/ratio[0])*ratio[1] - breakTime)*(ratio[0]/ratio[1]);
		breakTime = 0;
		update();
	};
</script> 

<svelte:head>
	<title>{isBreak ? format(breakTime) + ' - Break ' : format(workTime) + ' - Work '} | Ratio Timer</title>
</svelte:head>

<main>
	<div>
		<div class:break={isBreak} class="pointer"><span>▶</span></div>
		<h1 class:red={debt}>Work: {format(workTime)} {(breakTime*ratio[0]) - (workTime*ratio[1]) > 0 ? `(-${format((breakTime*(ratio[0]/ratio[1])) - workTime, true)})` : ''}</h1>
		<h1 class:red={debt}>Break: {format(breakTime)} {(workTime/ratio[0])*ratio[1] - breakTime >= 1 ? `(+${format((workTime/ratio[0])*ratio[1] - breakTime, true)})` : ''}</h1>
		<br>
		<h2>Total: {format(workTime + breakTime)} ({format(workTime + breakTime + (workTime/ratio[0])*ratio[1] - breakTime)})</h2>
		<h2>Started: {time?.toLocaleTimeString() || 'null'}</h2>
		<br>
	</div>
	<div class="controls">
		<span>Work:</span> <input type="number" min="1" bind:value={ratio[0]}>
		<span>to</span>
		<span>Break:</span> <input type="number" min="1" bind:value={ratio[1]}>
	</div>
	<div class="buttons">
		<button on:click={()=>{if (confirm('Are you sure you want to clear your session?')) clear()}}>Clear</button>
		<button on:click={()=>toggle()}>{!time ? (run ? 'Stop' : 'Start') : (run ? 'Pause' : 'Resume')}</button>
		<button on:click={switchMode}>{isBreak ? 'Do Work' : 'Do Break'}</button>
	</div>
	<details style="text-align: center;">
		<summary>Edit Time</summary>
		<div>
			Work: <input type="number" min="0" on:change={()=>edit('work')} bind:value={input[0]}>m <input type="number" min="0" on:change={()=>edit('work')} bind:value={input[1]}>s<br>
			Break: <input type="number" min="0" on:change={()=>edit('break')} bind:value={input[2]}>m <input type="number" min="0" on:change={()=>edit('break')} bind:value={input[3]}>s
			<p>Be sure to pause/stop the timer before editing the time!</p>
			<button on:click={()=>{if (confirm('Are you sure you want to trim your work and break hours?')) trimHours()}}>Trim</button>
		</div>
	</details>
	<details class="logs">
		<summary>Logs</summary>
		<div>
			{#each logs as log, i}
				<p>{new Date(log.timestamp).toLocaleTimeString()} - Action: "{log.action}"<br>{format(log.timers[0])} work<br>{format(log.timers[1])} break</p>
        <button style="margin-top: 0" on:click={()=>restore(...log.timers, i)}>Restore</button>
        <button style="margin-top: 0" on:click={()=>{if (confirm('Are you sure you want to remove this log?')) logs = logs.filter((el, ei) => ei !== i)}}>X</button>
			{/each}
		</div>
	</details>
	<div class="info">
		<h3>Info:</h3>
		<ul>
			<li>Set the ratio betweek work time and break time (default 5 to 1). Next, click "Start" to begin working!</li>
			<li>To switch between work and break, hit the "Do (Work|Break)" button.</li>
			<li>Your session will be saved to your device in case you accidentally close or refresh!</li>
			<li>Use the "Clear" button to reset your session.</li>
      <li>"Total" reports both the total time and the total time plus extra break time (inside the parenthesis)</li>
			<li>Use the "Trim" button under "Edit Time" to condense your time down to unbalanced time (remove time that conforms to the ratio).</li>
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