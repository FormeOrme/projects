export default class Reduce {
    static with = (func) => (a, c, i, f) => {
        func(a, c, i, f);
        return a;
    };

    static combineN = (N) =>
        Reduce.with((acc, _, index, full) => {
            let v = [];
            const fn = (i) => {
                v.push(full[i]);
                if (v.length == N) {
                    acc.push([...v]);
                } else {
                    for (let j = i + 1; j < full.length; j++) {
                        fn(j);
                    }
                }
                v.pop();
            };
            fn(index);
        });

    static combine = Reduce.combineN(2);

    static fullCombine = Reduce.with((a, _, i, f) => {
        const rl = a.length;
        for (let j = 0; j < Math.pow(2, i); j++) {
            const c = [];
            for (let k = 0; k < f.length; k++) {
                if ((rl + j + 1) & (1 << k)) {
                    c.push(f[k]);
                }
            }
            a.push(c);
        }
    });

    static permutations = (acc, current) => {
        if (acc.length === 0) {
            return [[current]];
        }
        const newPermutations = [];
        for (const perm of acc) {
            for (let i = 0; i <= perm.length; i++) {
                const newPerm = [...perm.slice(0, i), current, ...perm.slice(i)];
                newPermutations.push(newPerm);
            }
        }
        return newPermutations;
    };
}
