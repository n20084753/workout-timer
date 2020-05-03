import { writable } from 'svelte/store';

const configuration = writable({
    preparation: 10,
    workout: 30,
    rest: 10,
    sets: 5,
    rounds: 3,
});

export default configuration;
