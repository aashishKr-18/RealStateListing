import React from "react";
import "./Card.scss";
// import { useTheme} from "../../context/ThemeContext";
import PropTypes from "prop-types";
export default function Card({
  imageUrl,
  label,
  description,
  cardLink,
  cardClass,
}) {
  // const themeStyle = {
  //   color: useTheme() ? "#ccc" : "#333",
  // };
  return (
    <>
      <a target="_blank" rel="noopener noreferrer" href={cardLink}>
        <div  className={`Card ${cardClass}`}>
          {cardClass==="Project"&&<h3>{label}</h3>}
          <img className='Card__Photo' src={imageUrl} alt="" />

          {cardClass!=="Project"&&<div className="Card__Name">{label}</div>}
          <div className="Card__Description">{description}</div>
          <div className="Card__Links"></div>
        </div>
      </a>
    </>
  );
}


Card.propTypes = {
  imageUrl: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  cardLink: PropTypes.string,
  cardClass: PropTypes.string,
};
Card.defaultProps = {
  imageUrl : "",
  label : "",
  description : "",
  cardClass : "",
};
