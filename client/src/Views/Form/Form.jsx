import style from "./Form.module.css";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getTemperaments, postDog } from "../../Redux/actions";

const validate = ({name, minHeight, maxHeight, minWeight, maxWeight, lifespan}) => {
    const errors = {};
    if(!name) errors.name = "Name is required"
    if(!/^[a-zA-Z ]*$/.test(name)) errors.name = "Name can't contain numbers or special characters";
    if(minHeight < 1) errors.height = "Height must to be greater than 1"
    if(minWeight < 1) errors.weight = "Weight must to be greater than 1"
    if(!minHeight || !maxHeight) errors.height = "Height is required"
    if(!minWeight || !maxWeight) errors.weight = "Weight is required"
    if(Number(minHeight) > Number(maxHeight)) errors.height = "Minumun height can't be greater than maximum";
    if(Number(minWeight) > Number(maxWeight)) errors.weight = "Minumun weight can't be greater than maximum";
    if(!lifespan) errors.lifespan = "Lifespan is required";
    if(lifespan > 99) errors.lifespan = "Lifespan can't be greater than 99";
    if(lifespan < 1) errors.lifespan = "Lifespan must to be greater than 1"
    return errors
}

const Form = () => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getTemperaments())
    },[])
    const temperaments = useSelector(state => state.temperaments)
    
    const [form, setForm] = useState({
        name: "",
        minHeight:"",
        maxHeight:"",
        minWeight:"",
        maxWeight:"",
        lifespan:"",
        temperaments: []
    });
    
    const [errors, setErrors] = useState({
        name: "",
        height:"",
        weight:"",
        lifespan:""
    })
    
    
    const handleFormChange = (e) => {
        const prop = e.target.name;
        const value = e.target.value
        setForm({
            ...form,
            [prop]: value
        })

        setErrors(validate({
            ...form,
            [prop]: value
        }))
    }
    
    const handleFormTemperaments = (e) => {
        if(form.temperaments.length > 9) return
        if(e.target.value === "Temperaments") return
        if(!form.temperaments.includes(e.target.value)){
            setForm({
                ...form,
                temperaments: [...form.temperaments, e.target.value]
            })
        }
    }
    const handleDeleteTemperaments = (temp) => {
        setForm({
            ...form,
            temperaments: form.temperaments.filter(item => item !== temp)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        for(const field in form) {
            if(field.length === 0){
                alert("Missing data, please review the fields");
                return
            }
        }

        for( const error in errors) {
            if(error) {
                alert("Please, review the errors in the fields");
                return
            }
        };
        
        const dog = {
            name: form.name,
            height: `${form.minHeight} - ${form.maxHeight}`,
            weight: `${form.minWeight} - ${form.maxWeight}`,
            lifespan: form.lifespan,
            temperament: form.temperaments
        };

        if(!dog.temperament.length){
            alert("Please, select at least one temperament");
            return
        }
        
        dispatch(postDog(dog))
        alert("Dog successfully created!");
        setForm({
            name: "",
            minHeight:"",
            maxHeight:"",
            minWeight:"",
            maxWeight:"",
            lifespan:"",
            temperaments: []
        })
    }

    return (
        <>
        <a><Link to="/home">Back to home</Link></a>
        <div className={style.container}>
            <form onSubmit={handleSubmit}>
                <h1>Create your own dog</h1>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" value={form.name} onChange={handleFormChange}/>
                {errors.name && <p>{errors.name}</p>}

                <hr/>
                
                <label htmlFor="minHeight">Min height (cm): </label>
                <input type="number" name="minHeight" value={form.minHeight} onChange={handleFormChange} />
                <br />
                <label htmlFor="maxHeight"> Max height (cm): </label>
                <input type="number" name="maxHeight" value={form.maxHeight} onChange={handleFormChange}/>
                {errors.height && <p>{errors.height}</p>}

                <hr/>
                
                <label htmlFor="minWeight">Min weight (kg): </label>
                <input type="number" name="minWeight" value={form.minWeight} onChange={handleFormChange} />
                <br />
                <label htmlFor="maxWeight"> Max weight (kg): </label>
                <input type="number" name="maxWeight" value={form.maxWeight} onChange={handleFormChange}/>
                {errors.weight && <p>{errors.weight}</p>}
                <hr />

                <label htmlFor="lifespan">Lifespan (years): </label>
                <input type="number" name="lifespan" value={form.lifespan} onChange={handleFormChange}/>
                {errors.lifespan && <p>{errors.lifespan}</p>}
                <hr />

                <label htmlFor="temperaments">Temperaments (10 max.): </label>
                <select name="temperaments" onChange={handleFormTemperaments}>
                    <option>Temperaments</option>
                    {temperaments.map((temp,i) => {
                        return (
                            <option value={temp} key={i}>{temp}</option>
                            )
                        })}</select>

                <br />
                <ul className={style.temp_list}>
                    {form.temperaments.map((temp, i) =>{
                        return (
                            <>
                                <li key={i}>{temp} </li>
                                <a className={style.deleteTemp} onClick={()=>handleDeleteTemperaments(temp)}>x</a>
                            </>
                            )
                        })}
                </ul>
                <br />
                <button type="submit">Create!</button>
            </form>
        </div>
        </>
       
    )
}

export default Form