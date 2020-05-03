<script>
    import Icon from 'svelte-awesome';
    import { close } from 'svelte-awesome/icons';
    import { createEventDispatcher } from 'svelte';
    import Configuration from '../store/configuration-store.js';
    import Timer from './Timer.svelte';

    const dispatch = createEventDispatcher();

    const msg = new SpeechSynthesisUtterance();
    msg.volume = 1;
    msg.rate = 1;
    msg.voiceURI = 'Samantha';
    msg.lang = 'en-US';

    let WORKOUT_STATE = {
        READY: 'preparation',
        WORKOUT: 'workout',
        REST: 'rest',
    };

    let round = 1;
    let set = 1;
    let currentState = WORKOUT_STATE['READY'];

    const speak = (phrase) => {
        msg.text = phrase;
        speechSynthesis.speak(msg);
    };

    speak(`Get ready for round ${round}`);

    const updateWorkoutState = () => {
        if (currentState === WORKOUT_STATE['READY']) {
            currentState = WORKOUT_STATE['WORKOUT'];

            speak(`Start set ${set}`);
            return;
        }

        if (currentState === WORKOUT_STATE['REST']) {
            set++;
            currentState = WORKOUT_STATE['WORKOUT'];

            speak(`Start set ${set}`);
            return;
        }

        if (set < $Configuration.sets) {
            currentState = WORKOUT_STATE['REST'];

            speak(`Rest`);
            return;
        }

        // End of round increment round and reset set
        if (round < $Configuration.rounds) {
            currentState = WORKOUT_STATE['READY'];
            set = 1;
            round++;

            speak(`Get ready for round ${round}`);
            return;
        }

        speak(`Workout complete, you have slayed it`);
        dispatch('end');
    };
</script>

<style type="scss">
    .workout-page {
        display: flex;
        height: 100vh;
        flex-direction: column;
        .value {
            font-size: 36px;
            font-weight: 700;
        }
        .label {
            margin: 5px 0;
            color: #bebebe;
            font-size: 16px;
        }
        .round {
            padding: 40px 0;
            box-shadow: 0 1px 1px 0 rgba($color: #000000, $alpha: 0.15);
            position: relative;
            .close {
                position: absolute;
                top: 50%;
                right: 30px;
                transform: translateY(-50%);
                border: 3px solid #333;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                line-height: 70px;
                cursor: pointer;
            }
        }
        .workout {
            padding-top: 40px;
            flex-grow: 1;
            background-image: linear-gradient(to right, #b4f05a 0%, #96c850 100%);
            .label,
            .value {
                color: #4e4e4e;
                font-size: 36px;
            }

            &.preparation {
                background-image: linear-gradient(to right, #ffea00 0%, #e6d300 100%);
            }
            &.rest {
                background-image: linear-gradient(to right, #69d2f0 0%, #52cbee 100%);
            }
        }
    }
</style>

<div class="workout-page">
    <!-- Round -->
    <div class="round" on:click={() => dispatch('reset')}>
        <div class="value">{round} / {$Configuration.rounds}</div>
        <div class="label">Round</div>
        <div class="close">
            <Icon data={close} scale="2" />
        </div>
    </div>
    <!-- Workout -->
    <div class="workout {currentState}">
        {#if currentState === WORKOUT_STATE['READY']}
            <div class="label">GET READY</div>
            <Timer
                state={currentState}
                on:completed={updateWorkoutState}
                seconds={$Configuration.preparation} />
        {:else if currentState === WORKOUT_STATE['WORKOUT']}
            <div class="label">
                Set
                <span class="value">{set} / {$Configuration.sets}</span>
            </div>
            <Timer
                state={currentState}
                on:completed={updateWorkoutState}
                seconds={$Configuration.workout} />
        {:else}
            <div class="label">Rest {set} / {$Configuration.sets}</div>
            <Timer
                state={currentState}
                on:completed={updateWorkoutState}
                seconds={$Configuration.rest} />
        {/if}
    </div>
    <!-- Timer -->
</div>
