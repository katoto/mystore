/**
 * Created by sampson on 2017/5/15.
 */
export function mapActions (acts, ns) {
    let aTypes = {}
    let actions = {}
    Object.keys(acts).forEach((key) => {
        aTypes[key] = [ns, key].join('/')
        actions[aTypes[key]] = acts[key]
    })
    return {actions, aTypes}
}

export function mapMutations (muts, ns) {
    let mTypes = {}
    let mutations = {}
    Object.keys(muts).forEach((key) => {
        mTypes[key] = [ns, key].join('/')
        // console.log(key);
        // console.log(mTypes[key])
        mutations[mTypes[key]] = muts[key]
    })
    return {mutations, mTypes}
}

export function wait (time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time)
    })
}
