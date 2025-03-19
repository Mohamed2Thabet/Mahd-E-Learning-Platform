import React from "react";
import { BiCodeAlt, BiBriefcase, BiPlusCircle } from "react-icons/bi";
import { FaBrush } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { MdBusinessCenter } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import "../styles/profession.css"
import InputSearch from "../components/UI/InputSearch";
import NextButton from "../components/UI/NextButton";
import SkipButton from "../components/UI/SkipButton";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-bootstrap";

const professions = [
  { name: "Software Development", icon: <BiCodeAlt /> },
  { name: "Design", icon: <FaBrush /> },
  { name: "Marketing", icon: <AiOutlineBarChart /> },
  { name: "Business & Finance", icon: <MdBusinessCenter /> },
  { name: "Engineering", icon: <GiArtificialIntelligence /> },
  { name: "AI & Data Science", icon: <GiArtificialIntelligence /> },
];

const ProfessionSelection = () => {
  const navigate = useNavigate()
  return (
    <div className="profession container  d-flex align-items-center justify-content-center " style={{ minHeight: "100vh" }} data-aos="fade-in">
      <div className="box text-light boxshadowBg d-flex flex-column justify-content- mx-auto " data-aos="zoom-in" data-aos-duration="1500">
        <h2 className="fw-bold mb-3" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">What is your current profession?</h2>
        <p className="text-secondary mb-5" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="400">
          Select your industry or search for your specific role
        </p>

        <InputSearch data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500" />

        {/* Profession Buttons */}
        <div className="row g-3 mt-4">
          {professions.map((prof, index) => (
            <div key={index} className="col-6" data-aos="flip-up" data-aos-duration="1500" data-aos-delay={600 + index * 100}>
              <button className="btn btn-outline-success w-100 d-flex align-items-center p-3">
                <span className="me-2 fs-4 iconbg">{prof.icon}</span>
                {prof.name}
                <img className="ms-auto " src="image/back.png" alt="" />
              </button>
            </div>
          ))}
        </div>

        {/* Other Profession Button */}
        <div className="mt-3" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="800">
          <button className="btn btn-outline-light w-100 p-3">
            <BiPlusCircle className="me-2" size={24} /> Other Profession
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
        <Link to="/" className="text-success fw-bold text-decoration-none">
                        Skip
        </Link>
          <NextButton color="#01FE84" onClick={() => navigate('/thank-you')} />
        </div>
      </div>
    </div>
  );
};

export default ProfessionSelection;
