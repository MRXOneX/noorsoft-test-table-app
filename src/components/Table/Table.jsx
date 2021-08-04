import React from 'react'
import './Table.css'
import logo from '../../assets/image/edit-table.png'
import axios from "axios";
import ItemTable from "./ItemTable";
import Loader from "../Loader";
import {useFormik} from "formik";

const Table = () => {
    const [records, setRecords] = React.useState([])
    const [isLoader, setIsLoader] = React.useState(false)
    React.useEffect(() => {
        try {
            (async () => {
                await axios.get('http://localhost:3001/records')
                    .then(response => setRecords(response.data))
                setIsLoader(true)
            })()
        } catch (e) {
            console.log("Не удалось получить записи:", e)
        }
    }, [])

    const onUpdateRecord = async (obj) => {
        try {
            await axios.put(`http://localhost:3001/records/${obj.id}`, {
                id: obj.id,
                nickname: obj.nickname,
                text: obj.text,
            })
        } catch (e) {
            console.log('Не удалось обновить запись: ', e)
        }
    }

    const onDeleteRecord = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/records/${id}`)
        } catch (e) {
            console.log('Не удалось удалить запись')
        }
    }
    const onAddRecord =  (obj) => {
        try {
            axios.post(`http://localhost:3001/records`, obj)
                .catch(function (error) {
                    if(error.response.status === 500) {
                        alert(`Введенный ID-${obj.id} существует`)
                    }
                });


        } catch (e) {
            console.log('Не удалось добавить запись: ', e)
        }
    }

    const validate = values => {
        const errors = {};

        if (!values.id) {
            errors.id = 'Обязательно для заполнения';
        } else if (values.id.length > 5) {
            errors.id = 'Должно быть не более 5 символов';
        }

        if (!values.nickname) {
            errors.nickname = 'Обязательно для заполнения';
        } else if (values.nickname.length > 15) {
            errors.nickname = 'Должно быть не более 15 символов';
        }

        if (!values.text) {
            errors.text = 'Обязательно для заполнения';
        } else if (values.text.length > 25) {
            errors.text = 'Должно быть не более 25 символов';
        }

        return errors;
    };
    const formik = useFormik({
        initialValues: {
            id: '',
            nickname: '',
            text: ''
        },
        validate,
        onSubmit: values => {
            onAddRecord(values)

        },
    });

    return (
        <div className='wrapper'>
            <div className='header'>
                <div className='blockLogo'>
                    <img src={logo} alt=""/>
                </div>
                <div className='blockName'>
                    <p>React table</p>
                </div>
            </div>
            <div className='menuNav'>
                <div>ID</div>
                <div>Nickname</div>
                <div>Text</div>
            </div>
            <div className='content'>
                {isLoader ?
                    <div className='blockTable'>
                        {records &&
                        records.map((item, index) => (
                            <ItemTable key={index} {...item}
                                       validate={validate}
                                       onUpdateRecord={onUpdateRecord}
                                       onDeleteRecord={onDeleteRecord}/>
                        ))
                        }
                    </div>
                    : <Loader/>
                }
                <div className='blockAdd'>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                id='id'
                                name='id'
                                type='number'
                                placeholder={`${formik.errors.id ? `${formik.errors.id}` : 'Введите id...'}`}
                                onChange={formik.handleChange}
                                value={formik.values.id}
                            />
                        </form>
                    </div>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                id='nickname'
                                name='nickname'
                                type='text'
                                placeholder={`${formik.errors.nickname ? `${formik.errors.nickname}` : 'Введите nickname...'}`}
                                onChange={formik.handleChange}
                                value={formik.values.nickname}
                            />
                        </form>
                    </div>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                id='text'
                                name='text'
                                type='text'
                                placeholder={`${formik.errors.text ? `${formik.errors.text}` : 'Введите text...'}`}
                                onChange={formik.handleChange}
                                value={formik.values.text}
                            />
                            <div className='btnAdd'>
                                <button type='submit'>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Table