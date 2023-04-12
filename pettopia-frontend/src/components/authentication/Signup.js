import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupFields } from "./constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import AppContext from '../../AppContext';

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate()
  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount=()=>{
    let signUpFields = {
      username:signupState['username'],
      email:signupState['email-address'],
      password:signupState['password']
    }
    fetch(`${backendUrl}/api/v1/user`, {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUpFields)
    })
    .then((res) => res.json())
    .then(data => console.log(data.token))
    .then(() => navigate(-1))
    .catch(err => console.error(err))
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}
