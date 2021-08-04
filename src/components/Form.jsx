/*
import save from "../assets/image/save-image.png";
import editImg from '../assets/image/edit-image.png'
import React from 'react'

const Form = ({form, onClickEdit, text, edit, valueForm, id, name, type, placeholder}) => {
    return (
        <>
            {edit
                ?
                <form onSubmit={form.handleSubmit}>
                    <input
                        id=id
                        name=name
                        type=type
                        placeholder=placeholder
                        onChange={form.handleChange}
                        value={form.values.valueForm}
                        onBlur={onClickEdit}
                    />

                    <button onClick={onClickEdit}><img src={save} alt="btnSave"/>save</button>
                </form>
                :
                <>
                    <div>
                        <span>{text}</span>
                    </div>
                    <button onClick={onClickEdit}><img src={editImg} alt="btnEdit"/>edit</button>
                </>
            }
        </>
    )
}
export default Form*/
