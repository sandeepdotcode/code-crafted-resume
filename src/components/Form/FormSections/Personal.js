import useFormStore from "../../../store";

function Personal() {
  const personalData = useFormStore((state) => state.personal);
  const handleInputChange = useFormStore((state) => state.changePersonal);

  const summaryString = `As a Principal Software Engineer, I excel in designing and developing robust and scalable software solutions ...`;
  const { name, title, email,
          phone, summary, address } = personalData;

  return (
    <div className="personal-container">
      <div className="personal-input-container">
        <label><span>Full Name</span>
          <input type="text" name="name" placeholder="John Doe" 
            onChange={handleInputChange} value={name}></input>
        </label>
        <label><span>Job Title<span> optional</span></span>
          <input type="text" name="title" placeholder="Principal Software Engineer"
            onChange={handleInputChange} value={title}></input>
        </label>
        <label><span>Email</span>
          <input type="email" name="email" placeholder="johndoe@xyz.com" onChange={handleInputChange}
            value={email}></input>
        </label>
        <label><span>Phone<span> not recommended</span></span>
          <input type="text" name="phone" placeholder="944 704 8000" onChange={handleInputChange}
            value={phone}></input>
        </label>
      </div>
      <label><span>Address<span> optional</span></span>
        <input type="text" name="address" placeholder="Blue Island, Metaverse" onChange={handleInputChange}
          value={address}></input>
      </label>
      <label className="summary-label"><span>Summary<span> not recommended</span></span>
        <textarea name="summary" placeholder={summaryString} onChange={handleInputChange}
          value={summary}></textarea>
      </label>
    </div>
  );
}

export default Personal;