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
                await axios.get('http://178.128.196.163:3000/api/records')
                    .then(response => setRecords(response.data))
                setIsLoader(true)
            })()
        } catch (e) {
            console.log("Не удалось получить записи:", e)
        }
    }, [])

    const onUpdateRecord = (obj) => {
        const data = {
            name: obj.name,
            surname: obj.surname
        }
        try {
            axios.post(`http://178.128.196.163:3000/api/records/${obj.id}`, {
                data
            })
            setRecords(prev => prev.filter(item => item._id === obj.id) && [{
                data
            }])
        } catch (e) {
            console.log('Не удалось обновить запись: ', e)
        }
    }

    const onDeleteRecord =  (id) => {
        try {
            axios.delete(`http://178.128.196.163:3000/api/records/${id}`)
            setRecords(prev => prev.filter(item => item._id !== id))
        } catch (e) {
            console.log('Не удалось удалить запись')
        }
    }
    const onAddRecord = (obj) => {
        const data = {
            name: obj.name,
            surname: obj.surname
        }
        try {
            axios.put(`http://178.128.196.163:3000/api/records`, {
                data
            })
                .catch(function (error) {
                    if(error.response.status === 500) {
                        alert(`Введенный ID-${obj.id} существует`)
                    }
                });
                setRecords(prev => [...prev, {
                    data
                }])

        } catch (e) {
            console.log('Не удалось добавить запись: ', e)
        }
    }

    const validate = values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Обязательно для заполнения';
        } else if (values.name.length > 15) {
            errors.name = 'Должно быть не более 15 символов';
        }

        if (!values.surname) {
            errors.surname = 'Обязательно для заполнения';
        } else if (values.surname.length > 15) {
            errors.surname = 'Должно быть не более 15 символов';
        }

        return errors;
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            surname: ''
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
                <div className='blockNameLogo'>
                    <p>React table</p>
                </div>
            </div>
            <div className='menuNav'>
                <div>Name</div>
                <div>Surname</div>
            </div>
            <div className='content'>
                {isLoader ?
                    <div className='blockTable'>
                        {records &&
                        records.map((item, index) => (
                            <ItemTable key={index}
                                       item={item}
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
                                id='name'
                                name='name'
                                type='text'
                                placeholder={`${formik.errors.name ? `${formik.errors.name}` : 'Введите name...'}`}
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </form>
                    </div>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                id='surname'
                                name='surname'
                                type='text'
                                placeholder={`${formik.errors.surname ? `${formik.errors.surname}` : 'Введите surname...'}`}
                                onChange={formik.handleChange}
                                value={formik.values.surname}
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