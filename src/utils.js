export const displaySecondsInTime = (time) => {
    const strPad = (string, pad, length) => {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    };

    let minuites = Math.floor(time / 60);
    let seconds = time - minuites * 60;

    return `${minuites}:${strPad(seconds, '0', 2)}`;
};