import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const DetailsForm = () => {
  const [submittedData, setSubmittedData] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({ mode: "onChange" })

  function onSubmit(data) {
    setSubmittedData(data)
    reset()
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name:</label>
          <input {...register('name', { required: "Name is Required" })} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            {...register('age', {
              required: "Age is required",
              min: { value: 1, message: "Age must be positive" }
            })}
          />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            {...register('phoneNumber', {
              required: "Phone Number is Required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone Number must be of 10 digits"
              }
            })}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
        </div>

        <div className="form-group">
          <label>Country:</label>
          <select {...register('country', { required: "Country is required" })}>
            <option value="">--Select Country--</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
          {errors.country && <p className="error">{errors.country.message}</p>}
        </div>

        <div className="form-group">
          <label>Skills:</label>
          <label>
            <input type="checkbox" value="React" {...register("skills", { required: "Please select at least one skill" })} /> React
          </label>
          <label>
            <input type="checkbox" value="Node" {...register("skills", { required: "Please select at least one skill" })} /> Node
          </label>
          <label>
            <input type="checkbox" value="JavaScript" {...register("skills", { required: "Please select at least one skill" })} /> JavaScript
          </label>
          {errors.skills && <p className="error">{errors.skills.message}</p>}
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <label>
            <input type="radio" value="Male" {...register("gender", { required: "Gender is required" })} /> Male
          </label>
          <label>
            <input type="radio" value="Female" {...register("gender", { required: "Gender is required" })} /> Female
          </label>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>

        <input 
          type="submit" 
          className="submit-btn"  
          disabled={!isValid}  
        />
      </form>

      {submittedData && (
        <div className="card">
          <h3>Submitted Data</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{submittedData.name}</td>
              </tr>
              <tr>
                <td><strong>Age:</strong></td>
                <td>{submittedData.age}</td>
              </tr>
              <tr>
                <td><strong>Phone Number:</strong></td>
                <td>{submittedData.phoneNumber}</td>
              </tr>
              <tr>
                <td><strong>Country:</strong></td>
                <td>{submittedData.country}</td>
              </tr>
              <tr>
                <td><strong>Skills:</strong></td>
                <td>{submittedData.skills.join(", ")}</td>
              </tr>
              <tr>
                <td><strong>Gender:</strong></td>
                <td>{submittedData.gender}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default DetailsForm
