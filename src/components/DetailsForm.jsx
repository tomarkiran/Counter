import React, { useState } from "react"

const DetailsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phoneNumber: "",
    gender: "",
    skills: [],
    country: "",
  });

  const [errors, setErrors] = useState({})

 const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/
    return phoneRegex.test(phoneNumber)
  }

  const validateForm = () => {
    let newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is Required"
    }

    if (!formData.age) {
      newErrors.age = "Age is Required";
    } else if (Number(formData.age) <= 0) {
      newErrors.age = "Age must be a positive number"
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is Required"
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is Required"
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "Select at least one skill"
    }

    if (!formData.country) {
      newErrors.country = "Country is Required"
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = validateForm()
    if (isValid) {
      console.log("Form Submitted", formData)
      alert("Form Submitted Successfully!")
    } else {
      console.log("Form Validation Failed")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedSkills = [...formData.skills]
    if (checked) {
      updatedSkills.push(name)
    } else {
      updatedSkills = updatedSkills.filter((skill) => skill !== name)
    }
    setFormData({ ...formData, skills: updatedSkills })
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your Name"
          onChange={handleChange}
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          placeholder="Enter your Age"
          onChange={handleChange}
        />
        {errors.age && <div className="error">{errors.age}</div>}
      </div>

      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Enter your Phone Number"
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <div className="error">{errors.phoneNumber}</div>
        )}
      </div>

      <div>
        <label>Country:</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
        </select>
        {errors.country && <div className="error">{errors.country}</div>}
      </div>

      <div>
        <label>Skills:</label>
        <label>
          <input
            type="checkbox"
            name="react"
            checked={formData.skills.includes("react")}
            onChange={handleCheckboxChange}
          />
          React
        </label>
        <label>
          <input
            type="checkbox"
            name="node"
            checked={formData.skills.includes("node")}
            onChange={handleCheckboxChange}
          />
          Node
        </label>
        <label>
          <input
            type="checkbox"
            name="javascript"
            checked={formData.skills.includes("javascript")}
            onChange={handleCheckboxChange}
          />
          JavaScript
        </label>
        {errors.skills && <div className="error">{errors.skills}</div>}
      </div>

      <div>
        <label>Gender:</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />
          Male
        </label>
        {errors.gender && <div className="error">{errors.gender}</div>}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default DetailsForm;
