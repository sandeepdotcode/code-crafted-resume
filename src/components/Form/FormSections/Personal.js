import { useEffect, useState } from "react";

function getInitialState() {
  if (localStorage.getItem('personalState'))
    return JSON.parse(localStorage.getItem('personalState'));
  return {
    name: "",
    title: "",
    email: "",
    phone: "",
    summary: "",
  };
}

function Personal() {
  const [ personalData, setPersonalData ] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem('personalState', JSON.stringify(personalData));
  }, [personalData])

  const handleInputChange = (e) => {
    setPersonalData({
      ...personalData,
      [e.target.name]: e.target.value,
    })
  }

  const summaryString = `As a Principal Software Engineer, I excel in designing and developing robust and scalable software solutions ...`;
  const { name, title, email,
          phone, summary } = personalData;

  return (
    <>
      <div className="personal-input-container">
        <label><span>Full Name</span>
          <input type="text" name="name" placeholder="John Seed" 
            onChange={handleInputChange} value={name}></input>
        </label>
        <label><span>Job Title<span> optional</span></span>
          <input type="text" name="title" placeholder="Principal Software Engineer"
            onChange={handleInputChange} value={title}></input>
        </label>
        <label><span>Email</span>
          <input type="email" name="email" placeholder="johnseed@xyz.com" onChange={handleInputChange}
            value={email}></input>
        </label>
        <label><span>Phone<span> not recommended</span></span>
          <input type="text" name="phone" placeholder="944 704 8000" onChange={handleInputChange}
            value={phone}></input>
        </label>
      </div>
      <label className="summary-label"><span>Summary<span> not recommended</span></span>
        <textarea name="summary" placeholder={summaryString} onChange={handleInputChange}
          value={summary}></textarea>
      </label>
    </>
  );
}

export default Personal;