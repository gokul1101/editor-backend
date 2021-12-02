import React from "react";
import { NavLink, Route, Switch, Redirect, Link } from "react-router-dom";

const Challenges = () => {
  return (
    <div
      className="container-fluid quiz-cards"
      style={{ marginTop: "20px", height: "100vh", overflowY: "scroll" }}
    >
      <div className="d-flex">
        <div className="contest-header mr-auto">
          <p className="text-left dash-title-category pb-2">Challenges</p>
        </div>
        <div className="create-con">
          <Link to="/challenges/challenges-dashboard">
            <button className="p-2">
              <i className="fas fa-plus pr-2 pl-2"></i>CREATE CHALLENGES
            </button>
          </Link>
        </div>
      </div>
      <div class="text_hovering_cards text_hovering_cards-1 d-flex flex-wrap align-items-center justify-content-center m-1">
        <div class="text_hovering_card text_hovering_card">
          <div class="text_hovering_card_content">
            <section>
              <span class="section_left">
                <h3>November Challenge 2019</h3>
                <h5>Lorem Ipsum is simply dummy text to the heaven...</h5>
              </span>
              <span class="section_right">
                <Link to="/challenges/challenges-dashboard/create-challenge" class="card_but">
                  <i class="fa fa-pen"></i>
                </Link>
              </span>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
