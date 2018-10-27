
// Handle events from simple input elements.

import { set as rxSet } from 'state/rx'

export const onChange = ev => {
    const target = ev.target
    if (target) {
        if (target.id && target.value) {
            rxSet(target.id + '.uiSet', { value: target.value })
        }
    }
}

export const onToggle = ev => {
    const target = ev.target
    if (target) {
        if (target.id) {
            rxSet(target.id + '.toggle')
        }
    }
}


