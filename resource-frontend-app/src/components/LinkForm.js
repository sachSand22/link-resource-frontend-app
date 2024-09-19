import React, { useState } from 'react';
import axios from 'axios';

const LinkForm = () => {
  const [teamName, setTeamName] = useState('');
  const [links, setLinks] = useState([{ url: '', title: '' }]);
  const [response, setResponse] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle change in team dropdown
  const handleTeamChange = (event) => {
    setTeamName(event.target.value);
  };

  // Handle change in the link fields
  const handleLinkChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...links];
    newLinks[index][name] = value;
    setLinks(newLinks);
  };

  // Add a new link input row
  const addLink = () => {
    setLinks([...links, { url: '', title: '' }]);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:8080/api/links/${teamName}/map`, links)
      .then((res) => {
        setResponse(res.data);
        setSuccessMessage('Link Successfully added');
        // Clear form fields after successful submission
        setTeamName('');
        setLinks([{ url: '', title: '' }]);
      })
      .catch((err) => {
        console.error(err);
        setSuccessMessage('Error adding link');
      });
  };

  return (
    <div>
      <h1>Link Mapping Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Team Name:</label>
          <select value={teamName} onChange={handleTeamChange}>
            <option value="">Select Team</option>
            <option value="AI_Ops">AI_Ops</option>
            <option value="ML_Engineering">ML_Engineering</option>
            <option value="GenAI">GenAI</option>
          </select>
        </div>
        <div>
          <h3>Links:</h3>
          {links.map((link, index) => (
            <div key={index}>
              <input
                type="text"
                name="url"
                value={link.url}
                onChange={(event) => handleLinkChange(index, event)}
                placeholder="URL"
                required
              />
              <input
                type="text"
                name="title"
                value={link.title}
                onChange={(event) => handleLinkChange(index, event)}
                placeholder="Title"
                required
              />
            </div>
          ))}
          <button type="button" onClick={addLink}>
            Add Another Link
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default LinkForm;
