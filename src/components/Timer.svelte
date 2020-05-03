<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import { displaySecondsInTime } from '../utils.js';

    export let state = '';
    export let seconds = 0;
    let paused = false;

    const dispatch = createEventDispatcher();

    const msg = new SpeechSynthesisUtterance();
    msg.volume = 1;
    msg.rate = 1;
    msg.voiceURI = 'Samantha';
    msg.lang = 'en-US';

    const interval = setInterval(() => {
        if (paused) return;

        seconds--;
        if (seconds === 0) {
            clearInterval(interval);
            dispatch('completed');
            return;
        }

        if (seconds <= 3) {
            msg.text = seconds;
            speechSynthesis.speak(msg);
        }
    }, 1000);

    onDestroy(() => {
        clearInterval(interval);
    });

    $: time = displaySecondsInTime(seconds);
</script>

<style type="scss">
    .timer {
        display: flex;
        flex-direction: column;
        height: calc(100% - 52px);
    }
    .time {
        flex-grow: 1;
        font-size: 200px;
        font-weight: 700;
        text-shadow: 3px 3px rgba(0, 0, 0, 0.15);
    }
    .footer {
        padding: 40px 0;
        background: white;
    }
</style>

<div class="timer">
    <div class="time">{time}</div>
    <div class="footer">
        <button class={state} on:click={() => (paused = !paused)}>
            {!paused ? 'PAUSE' : 'RESUME'}
        </button>
    </div>
</div>
