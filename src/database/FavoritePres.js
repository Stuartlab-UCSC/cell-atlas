
// The database favorite presentation.

import React from 'react'
import FormControl from "@material-ui/core/FormControl/FormControl"
import Input from "@material-ui/core/Input/Input"
import InputLabel from "@material-ui/core/InputLabel"
import NativeSelect from '@material-ui/core/NativeSelect'

const FavoriteList = ({id, list, selected, onChange}) => {
    if (!list) {
        list = []
    }
    const comp =
        <FormControl style={{ width: '100%' }}>
            <InputLabel>
                Favorites
            </InputLabel>
            <NativeSelect
                value={selected}
                onChange={onChange}
                label="Favorites"
                input={<Input />}
            >
                {list.map((opt, i) => (
                    <option
                        value={opt.value}
                        data-id={id}
                        key={i}>
                        {opt.name}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    return comp
}

const FavoritePres = (props) => {
    let { list, selected, onChange } = props
    const id = 'favorite'
    return (
        <FavoriteList
            id={id + '.favoriteList'}
            list={list}
            selected={selected}
            onChange={onChange}
        />
    )
}

export default FavoritePres
