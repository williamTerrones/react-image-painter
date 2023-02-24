import React, { FC } from 'react'

interface Props {
    value?:number
    onChange?:React.ChangeEventHandler<HTMLInputElement>
}

const SelectRange:FC<Props> = ({value, onChange}) => {
    return (
        <div className="flex flex-col">
            <label htmlFor="">Tamaño de la linea</label>
            <input type="range" min={1} max={10}
                value={value} onChange={onChange} />
        </div>
    )
}

export default SelectRange