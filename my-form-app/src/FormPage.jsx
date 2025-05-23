import { useState } from "react";
import { useNavigate } from "react-router";
import './Form.css'


function FormPage(){
    const navigate= useNavigate();

    const [formData, setFormData]= useState({
         firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        showPassword: false,
        phoneCode: '',
        phoneNumber: '',
        country: '',
        city: '',
        pan: '',
        aadhar: ''
    });

    const [errors, setErrors] = useState({});

    const validateField = (name, value) =>{
        let error= '';

        switch(name){
            case 'firstName':
            case 'lastName':
            case 'username':
                if (!value.trim()) error = `${name} is required.`;
                break;
            
            case 'email':
                if(!value.trim()) error = 'Email is required.';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error= 'invalid email.'
                break;

            case 'password':
                if (!value) error= 'Password is required';
                else if (value.length < 6) error= "enter a 6 character password"
                break;

            case 'phoneCode':
            case 'phoneNumber':
                if(!value.trim()) error = `${name} is required.`;
                else if (name === 'phoneNumber' && !/^\d{10}$/.test(value)) error = 'enter a 10 digit phone number';
                break;

            case 'country':
            case 'city':
                if (!value) error = `${name} is required`;
                break;

            case 'pan':
                if (!value) error = 'PAN is required';
                else if (value.length < 9) error = "PAN number must be 9 chars"
                break;

            case 'aadhar':
                if (!value) error = "Adhaar is required"
                else if (value.length < 12) error= 'Adhaar must be 12 chars'
                break;
            
            default:
                break;
        }

        setErrors(prev => ({...prev, [name]: error}));
        return error;
    }

    const handleBlur= (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handleChange= (e)=>{
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData(prev => ({ ...prev, [name]: val}));
    };

    const handleSubmit = (e)=>{
        e.preventDefault();

        const newErrors =  {};
        Object.entries(formData).forEach(([key, value])=>{
            validateField(key, value);
            if (key !== 'showPassword'){
                const err = validateField(key, value);
                if (err) newErrors[key] = err;
            }
        });

        if(Object.keys(newErrors).length === 0){
            navigate('/submitted', { state: formData});
        }
        else{
            setErrors(newErrors);
        }
        //passing the data
    };

    const isFormValid= Object.values(errors).every(err => err === '') && Object.entries(formData).every(([key, value]) => key === 'showPassword' || value);


    return(
        <>
        <form onSubmit={handleSubmit}>
            <h2>Registration Form</h2>

            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange}
            onBlur={handleBlur} />{errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}

            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange}
            onBlur={handleBlur} />{errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
            <br />

            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange}
            onBlur={handleBlur} />{errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
            <br />

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
            onBlur={handleBlur} />{errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            <br />

            <input
                type={formData.showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
            />{errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            <label>
                <input type="checkbox" name="showPassword" checked={formData.showPassword} onChange={handleChange}
                onBlur={handleBlur} />
                Show Password
            </label>
            <br />

            <input type="text" name="phoneCode" placeholder="Country Code" value={formData.phoneCode} onChange={handleChange}
            onBlur={handleBlur} />{errors.phoneCode && <span style={{ color: 'red' }}>{errors.phoneCode}</span>}

            <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange}
            onBlur={handleBlur} />{errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber}</span>}
            <br />

            <select name="country" value={formData.country} onChange={handleChange}
            onBlur={handleBlur}>
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
            </select>{errors.country && <span style={{ color: 'red' }}>{errors.country}</span>}
            <br />

            <select name="city" value={formData.city} onChange={handleChange}
            onBlur={handleBlur}>
                <option value="">Select City</option>
                <option value="Delhi">Delhi</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Mumbai">Mumbai</option>
            </select>{errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
            <br />

            <input type="text" name="pan" placeholder="PAN Number" value={formData.pan} onChange={handleChange}
            onBlur={handleBlur} />{errors.pan && <span style={{ color: 'red' }}>{errors.pan}</span>}
            <br />

            <input type="text" name="aadhar" placeholder="Aadhar Number" value={formData.aadhar} onChange={handleChange}
            onBlur={handleBlur} />{errors.aadhar && <span style={{ color: 'red' }}>{errors.aadhar}</span>}
            <br />

            <button type="submit" disabled={!isFormValid}>Submit</button>
        </form>
        <h6>created by Tanish Raj Singh.</h6>
        </>
    );
}
export default FormPage;