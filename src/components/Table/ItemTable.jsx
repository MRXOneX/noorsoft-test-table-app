import React from 'react'
import './Table.css'
import {useFormik} from "formik";
import save from "../../assets/image/save-image.png";
import editImg from '../../assets/image/edit-image.png'

const ItemTable = ({onUpdateRecord, onDeleteRecord, validate, item}) => {
    const record = item.data
    const [edit, setEdit] = React.useState(false)
    const onClickEdit = () => {
        console.log(edit)
        setEdit(!edit)
    }
    const formik = useFormik({
        initialValues: {
            id: item._id,
            name: record.name ,
            surname: record.surname,
        },
        validate,
        onSubmit: values => {
            onUpdateRecord(values)
            onClickEdit()
        },
    });

    return (
        <div className='itemTable'>
            <div className='blockName'>
                {edit ?
                    <>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder={`${formik.errors.name ? `${formik.errors.name}` : 'Введите name...'}`}
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </form>
                    </>
                    :
                    <>
                        <div>
                            <span>{record.name}</span>
                        </div>
                    </>
                }

            </div>
            <div className='blockNickname'>
                {edit ?
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            id='surname'
                            name='surname'
                            type='text'
                            placeholder={`${formik.errors.surname ? `${formik.errors.surname}` : 'Введите surname...'}`}
                            onChange={formik.handleChange}
                            value={formik.values.surname}
                        />
                        <button type='submit'><img src={save} alt="btnSave"/>save</button>
                    </form>

                    :
                    <>
                        <div>
                            <span>{record.surname}</span>
                        </div>
                        <button onClick={onClickEdit}><img src={editImg} alt="btnEdit"/>edit</button>
                        <button onClick={() => onDeleteRecord(item._id)}>delete</button>
                    </>
                }
            </div>
        </div>
    )
}
export default ItemTable