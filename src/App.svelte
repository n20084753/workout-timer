<script>
    import Configuration from './components/Configuration.svelte';
    import Workout from './components/Workout.svelte';
    import CongratsPage from './components/CongratsPage.svelte';

    let view = 'configuration';
</script>

<style type="scss">
    main {
        text-align: center;
    }
</style>

<main>
    {#if view === 'configuration'}
        <Configuration on:start={() => (view = 'workout')} />
    {:else if view === 'workout'}
        <Workout on:reset={() => (view = 'configuration')} on:end={() => (view = 'end')} />
    {:else}
        <CongratsPage on:click={() => (view = 'configuration')} />
    {/if}
</main>
