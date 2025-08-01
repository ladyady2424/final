import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="landing-container">
      <div className="content-section">
        <div className="left-panel">
          <h1>Conference Expense Planner</h1>
          <p>Plan your next major event with us!</p>
          <button onClick={() => navigate('/products')}>Get Started</button>
        </div>
        <div className="right-panel">
          <p><strong>Welcome to BudgetEase Solutions</strong>, your trusted partner in simplifying budget management and financial solutions. At BudgetEase, we understand the importance of effective budget planning and strive to provide intuitive, user‑friendly solutions to meet the diverse needs of our clients.</p>
          <p>With a commitment to efficiency and innovation, we empower individuals and businesses to take control of their finances and achieve their goals with ease.</p>
          <p>Our mission is to make budgeting effortless and accessible for everyone. Whether you're a small business owner, a busy professional, or looking to manage your personal finances, we tailor solutions to streamline your budgeting process.</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
