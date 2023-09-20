import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
          Real estate website is a digital space where realtors, home sellers, and homebuyers can get in touch to make a purchase or rent contract for a real estate item.Rent, buy, sell properties without brokerage. Get end to end assistance on NoBroker. Sell Your Land Easily. Just List It on NoBroker and Sell in Just a Few Clicks. Sell Your Land Faster. Plots Listings Now Live.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contributers</h2>
          <p>Name:Aashish</p>
          <p>Name:Anshuman Raj</p>
          <p>Name:Anurag</p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <p> <a style={{textDecoration:"none",color:"#555"}} href="https://github.com/aashishKr-18"> GitHub: aashishKr-18</a></p>
        
          <p> <a style={{textDecoration:"none",color:"#555"}} href="https://github.com/anshumanraj252"> GitHub: anshumanraj252</a></p>
          <p> <a style={{textDecoration:"none",color:"#555"}} href="https://github.com/anuragK-24"> GitHub: aruragK-24</a></p>
      
      
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <p>Continent: Asia</p>
          <p>Country: India</p>
          <p>Current Location: Banglore</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer