<script>
    import Icon from 'svelte-awesome';
    import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

    import { displaySecondsInTime } from '../utils.js';
    export let value = 0;
    export let type = 'number';
    export let min = 1;
    export let max = 99;
    export let step = 1;
    export let prefix = '';

    const increment = () => {
        if (value > max) return;
        value += step;
    };

    const decrement = () => {
        if (value < min) return;
        value -= step;
    };

    $: time = displaySecondsInTime(value);
</script>

<style type="scss">
    .Incrementer {
        display: flex;
        align-items: baseline;
        span {
            width: 120px;
        }
        .link-btn {
            text-decoration: none;
            transition: transform ease 250ms;
            &:hover {
                transform: scale(1.35);
            }
            &:active {
                transform: scale(1);
            }
        }
        .plus {
            color: #55c57a;
        }
        .minus {
            color: #ff7730;
        }
        .prefix {
            font-size: 30px;
        }
    }
</style>

<div class="Incrementer">
    <span class="minus link-btn" on:click|preventDefault={decrement}>
        <Icon data={faMinus} />
    </span>
    <span>
        <span class="prefix">{prefix}</span>
        {type === 'time' ? time : value}
    </span>
    <span class="plus link-btn" on:click|preventDefault={increment}>
        <Icon data={faPlus} />
    </span>
</div>
