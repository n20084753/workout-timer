<script>
    import { createEventDispatcher } from 'svelte';
    import Incrementer from './Incrementer.svelte';
    import { displaySecondsInTime } from '../utils.js';
    import Configuration from '../store/configuration-store.js';

    let totalTime = 0;
    const dispatch = createEventDispatcher();

    $: if ($Configuration.preparation) {
        totalTime =
            ($Configuration.preparation +
                ($Configuration.workout + $Configuration.rest) * $Configuration.sets) *
            $Configuration.rounds;
    }
</script>

<style type="scss">
    .centered-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .field {
        padding: 10px 0;
        .label {
            margin: 5px 0;
            color: #bebebe;
            font-size: 16px;
        }
        :global(.value) {
            font-size: 36px;
            font-weight: 700;
        }
    }

    .summary {
        margin-top: 60px;
        .label,
        :global(.value) {
            font-size: 18px !important;
        }
    }
</style>

<div class="configuration-page">
    <div class="centered-container">
        <div class="field">
            <div class="label">Preparation</div>
            <div class="value">
                <Incrementer
                    type="time"
                    max={3600}
                    step={5}
                    bind:value={$Configuration.preparation} />
            </div>
        </div>

        <div class="field">
            <div class="label">Workout</div>
            <div class="value">
                <Incrementer type="time" max={3600} step={5} bind:value={$Configuration.workout} />
            </div>
        </div>

        <div class="field">
            <div class="label">Rest</div>
            <div class="value">
                <Incrementer type="time" max={3600} step={5} bind:value={$Configuration.rest} />
            </div>
        </div>

        <div class="field">
            <div class="label">Sets</div>
            <div class="value">
                <Incrementer prefix="x" type="number" bind:value={$Configuration.sets} />
            </div>
        </div>

        <div class="field">
            <div class="label">Rounds</div>
            <div class="value">
                <Incrementer prefix="x" type="number" bind:value={$Configuration.rounds} />
            </div>
        </div>

        <div class="field summary">
            <span class="label">TOTAL</span>
            <span class="value">{displaySecondsInTime(totalTime)}</span>
        </div>

        <button class="button" on:click={() => dispatch('start')}>START</button>
    </div>
</div>
