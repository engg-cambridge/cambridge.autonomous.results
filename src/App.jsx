import React, { useState } from 'react';
import './App.css';

function App() {
  const [usn, setUsn] = useState('');
  const [dob, setDob] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  // Remove the useEffect with NodeHfs since it won't work in the browser
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const usnPattern = /^\d{1}[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{3}$/;
    if (!usnPattern.test(usn)) {
      alert('Please enter a valid USN (e.g., 1CD24IS111)');
      return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    const minDate = new Date('1990-01-01');
    if (dobDate > today || dobDate < minDate) {
      alert('Please enter a valid date of birth');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setShowResult(true);
    }, 5000);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
    setVideoEnded(false);
  };

  return (
    <div className="container">
      <img src="/college-logo.png" alt="College Logo" className="college-logo" />

      <h1>Semester 1 Results</h1>

      {!submitted && (
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="usn">USN</label>
            <input
              type="text"
              id="usn"
              placeholder="Enter USN (e.g., 1CD24CS001)"
              value={usn}
              onChange={(e) => setUsn(e.target.value.toUpperCase())}
              // pattern="^1[Pp][Ee]\d{2}[A-Za-z]{2}\d{3}$"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Check Results
          </button>
        </form>
      )}

      {submitted && !showResult && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Fetching your results...</p>
        </div>
      )}

      {showResult && (
        <div className="result-box">
         
          <button onClick={() => setShowVideo(true)} className="view-results-btn">
            View Results
          </button>
        </div>
      )}

      {showVideo && (
        <div className="video-container">
          <button className="close-button" onClick={closeVideo}>
            <span>×</span>
          </button>
          <div className="video-wrapper">
            <video
              autoPlay
              controls
              onEnded={handleVideoEnd}
              src="/funny-video.mp4"
            />
          </div>
          <div className="video-message">
            <h3>Thanks for watching! 😄</h3>
            <p className="funny-message">Plot twist: The real results are the friends we made along the way!</p>
            <p className="study-message">Now seriously, go study for your internals! 📚</p>
            <p className="motivation-message">Remember: Failing to prepare is preparing to fail! 💪</p>
            <button className="credits-btn" onClick={() => setShowCredits(prev => !prev)}>
              Made by 
            </button>
            {showCredits && (
              <div className="credits-box">
                <h4>Created By:</h4>
                <ul>
                  <li>Pavan</li>
                  <li>Shivaprasad</li>
                  <li>Anirudh</li>
                  <li>Nandeesh</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CIT Bangalore Result Portal</p>
        <p className="footer-note">* Please ensure your USN and Date of Birth are correct</p>
      </footer>
    </div>
  );
}

export default App;
  
