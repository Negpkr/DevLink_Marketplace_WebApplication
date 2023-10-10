import { v4 as uuidv4, v4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import JobHeader from './JobHeader';
import JobTypeSelector from './JobTypeSelector';
import '../job-post/job_post.css'
import { createCollectionAndAddDocuments, uploadImageAndSaveURL } from '../utils/firebase'
import { useLocation, Link, useNavigate } from 'react-router-dom'


function JobPost() {

  const nav = useNavigate()
  const [jobType, setJobType] = useState('employment'); // Default: employment

  const [headerText, setHeader] = useState('')
  const [errorText, setErrorText] = useState('')
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);


  const location = useLocation();
  const formData = location.state?.formData;

  useEffect(() => {
    const storedFormData = localStorage.getItem('jobFormData');
    const storedPaymentStatus = localStorage.getItem('isPaymentCompleted');

    if (storedFormData) {
      setjob(JSON.parse(storedFormData));
    }

    if (storedPaymentStatus) {
      setIsPaymentCompleted(JSON.parse(storedPaymentStatus));
    }
  }, []);

  const [job, setjob] = useState(() => {
    // Initialize with form data from the previous session if available
    return formData || {
      key: uuidv4(),
      title: '',
      description: '',
      skill: '',
      length: '',
      Paymin: '',
      Paymax: '',
      workingHour: '',
      experience: '',
      experienceMin: '',
      imageFile: null
    };
  });

  const { title, description, skill, length, Paymin, Paymax, workingHour, experience, experienceMin, key, imageFile } = job;
  console.log(job);

  useEffect(() => {
    localStorage.setItem('jobFormData', JSON.stringify(job));
  }, [job]);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    setjob((prevJob) => ({
      ...prevJob,
      imageFile: selectedFile,
    }));
  };

  // Upload the image to Firebase Storage and save its URL in Firestore
  const handleUpload = async () => {

    if (imageFile) {
      try {

        const imageURL = await uploadImageAndSaveURL(imageFile);

        setjob((prevJob) => ({
          ...prevJob,
          imageFile: imageURL,
        }));

        console.log('Image uploaded and URL saved successfully.');

      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image, Please try again!');

      }
    } else {
      alert('Please select an image before uploading.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target
    setjob((preValue) => {
      return {
        ...preValue,
        [name]: value
      }
    })
  };

  const handleSubmit = async (event) => {
    if (jobType == 'freelance' || (jobType == 'employment' && isPaymentCompleted)) {
      event.preventDefault();
      if (title == null) {
        alert("Title is empty!!")
        return;
      }
      try {
        const data = await createCollectionAndAddDocuments('Jobs', job)
        console.log(data)
        setHeader("Posted!")
        // Clear form data from local storage on successful submission
        localStorage.removeItem('jobFormData');
        localStorage.removeItem('isPaymentCompleted');
      }
      catch (error) {
        alert("Error in posting job! Try Again!");
        console.log('error in posting job', error.message)
      }
    }
    else {
      setErrorText("Payment is not conducted yet! Payment amount: 10 AU$")
    }
  }

  const handlePay = () => {
    setIsPaymentCompleted(true);
    localStorage.setItem('isPaymentCompleted', JSON.stringify(true)); // Save payment status
    nav("/payment", { formData: job });
  };
  

  return (
    <div className="job-post">
      <JobHeader text="Job Posting Page" />
      <h3>New Job</h3>
      <JobTypeSelector jobType={jobType} setJobType={setJobType} />
      <h3>Describe your job</h3>
      <section>
        <table className="job_form">
          <tr>
            <th>Title / Position</th>
            <th>
              <input className='input'
                name='title'
                type='text'
                onChange={handleChange}
                value={job.title}
              />
            </th>
          </tr>
          <br></br>
          <tr>
            <th>Job description</th>
            <th>
              <textarea className="textarea"
                name='description'
                onChange={handleChange}
                value={job.description}
              />
            </th>
          </tr>
          <br></br>
          <tr>
            <th>Skills</th>
            <th>
              <textarea className="textarea"
                placeholder="Please add skills that your job is required e.g., Java"
                name='skill'
                onChange={handleChange}
                value={job.skill}
              />
            </th>
          </tr>
        </table>
        <p> "Developers will find your job based on the skills you added here." </p>
      </section>
      <h3>Project Conditions</h3>
      <table className="form">
        <tr>
          <th>Project length</th>
          <th>
            <input className='input'
              placeholder="e.g. 3 months"
              name='length'
              type='text'
              onChange={handleChange}
              value={job.length}
            />
          </th>
        </tr>
        <br></br>
        <tr>
          <th>Payment</th>
          <th>
            <label>Min</label>
            <input className='input'
              label="Min"
              placeholder="Min amount"
              name='Paymin'
              type='text'
              onChange={handleChange}
              value={job.Paymin}
            />
          </th>
          <th>
            <label>Max</label>
            <input className='input'
              label="Max"
              placeholder="Max amount"
              name='Paymax'
              type='text'
              onChange={handleChange}
              value={job.Paymax}
            />
          </th>
        </tr>
        <br></br>
        <tr>
          <th>Working hours</th>
          <th>
            <input className='input'
              placeholder="e.g. 40 hours per week"
              name='workingHour'
              type='text'
              onChange={handleChange}
              value={job.workingHour}
            />
          </th>
        </tr>
      </table>
      <p></p>
      <table className="form">
        <tr>
          <th>Add an Image</th>
          <th>
            <input
              className='input'
              name='imageFile'
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </th>
        </tr>
        <tr>
          <th></th>
          <th className="upload">
            <button onClick={handleUpload}>Upload</button>
          </th>
        </tr>
      </table>

      {jobType == 'employment' && (
        <>
          <h3>Experience</h3>
          <table className="form">
            <tr>
              <th>Experienced in </th>
              <th>
                <input className='input'
                  placeholder="relative experience"
                  name='experience'
                  type='text'
                  onChange={handleChange}
                  value={job.experience}
                />
              </th>
            </tr>
            <br></br>
            <tr>
              <th>For at least</th>
              <th>
                <input className='input'
                  fluid placeholder="e.g. 3 months/years"
                  name='experienceMin'
                  type='text'
                  onChange={handleChange}
                  value={job.experienceMin}
                />
              </th>
            </tr>
          </table>
          {!isPaymentCompleted ? (
            <div className="post-button">
              <button name="isPaymentCompleted" type='submit'
                onClick={handlePay}>
                Pay</button>
              <br></br>
            </div>
          ) : (<br></br>)}
        </>
      )}
      <div className="post-button">
        <button type='submit'
          onClick={handleSubmit}>
          Post</button>
        <h4>{headerText}</h4>
        <h5>{errorText}</h5>
        <br></br>
      </div>
    </div>
  );
}

export default JobPost;

