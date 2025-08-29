import React from 'react'
import { useForm } from 'react-hook-form'

const DetailsForm = () => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm()

  function onSubmit(data) {
    console.log("Submitting the form...", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register('name', { required: "Name is Required" })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Age:</label>
        <input
          type="number"
          {...register('age', {
            required: "Age is required",
            min: { value: 1, message: "Age must be positive" }
          })}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div>
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
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label>Country:</label>
        <select {...register('country', { required: "Country is required" })}>
          <option value="">--Select Country--</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      <div>
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
        {errors.skills && <p>{errors.skills.message}</p>}
      </div>

      <div>
        <label>Gender:</label>
        <input type="radio" value="Male" {...register("gender", { required: "Gender is required" })} /> Male
        <input type="radio" value="Female" {...register("gender", { required: "Gender is required" })} /> Female
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <input type="submit" />
    </form>
  )
}

export default DetailsForm
