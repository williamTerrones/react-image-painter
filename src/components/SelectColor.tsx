import React, { FC } from 'react'

interface Props {
    onChange?:React.ChangeEventHandler<HTMLInputElement>
}

const SelectColor: FC<Props> = ({onChange}) => {
    return (
        <div className="flex flex-col">
            <label htmlFor="color">Color</label>
            <input type='color' onChange={onChange} />
        </div>
    )
}

export default SelectColor