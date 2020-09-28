
// This is reussable wait function that we can always use when we wanna wait before firing sth
export function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

