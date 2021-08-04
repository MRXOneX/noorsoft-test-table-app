import React from 'react'
import './Table.css'
import {useFormik} from "formik";
import save from "../../assets/image/save-image.png";
import editImg from '../../assets/image/edit-image.png'

const ItemTable = ({id, nickname, text, onUpdateRecord, onDeleteRecord, validate}) => {
    const [edit, setEdit] = React.useState(false)

    const onClickEdit = () => {
        setEdit(!edit)
    }

    const formik = useFormik({
        initialValues: {
            id: id === 0 ? '0' : id,
            nickname: nickname,
            text: text
        },
        validate,
        onSubmit: values => {
            onUpdateRecord(values)
            onClickEdit()
        },
    });

    return (
        <div className='itemTable'>
            <div className='blockId'>

                <div>
                    <span>{id}</span>
                </div>

            </div>
            <div className='blockNickname'>
                {edit ?
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            id='nickname'
                            name='nickname'
                            type='text'
                            placeholder={`${formik.errors.nickname ? `${formik.errors.nickname}` : 'Введите nickname...'}`}
                            onChange={formik.handleChange}
                            value={formik.values.nickname}
                        />
                    </form> :
                    <div>
                        <span>{nickname}</span>
                    </div>
                }
            </div>
            <div className='blockText'>
                {edit ?
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            id="text"
                            name='text'
                            type='text'
                            placeholder={`${formik.errors.text ? `${formik.errors.text}` : 'Введите text...'}`}
                            onChange={formik.handleChange}
                            value={formik.values.text}
                        />

                        <button type={'submit'}><img src={save} alt="btnSave"/>save</button>
                    </form>
                    :
                    <>
                        <div>
                            <span>{text}</span>
                        </div>
                        <button onClick={onClickEdit}><img src={editImg} alt="btnEdit"/>edit</button>
                        <button onClick={() => onDeleteRecord(id)}>delete</button>
                    </>
                }
            </div>
        </div>
    )
}
export default ItemTable