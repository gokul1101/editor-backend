import React, { useEffect } from "react";
import "./Roadmap.css";
const Roadmap = (props) => {
  useEffect(() => {
    props.setSideToggle(false);
  });
  return (
    <div>
      <div class="container roadmap-timeline p-3">
        <div class="row">
          <div class="col-md-12">
            <div class="main-timeline">
              <div class="timeline">
                <div class="timeline-icon">
                  <img src="https://img.icons8.com/color/96/000000/html-5--v1.png" alt="HTML" />
                </div>
                <div class="timeline-content">
                  <h3 class="title">HYPERTEXT MARKUP LANGUAGE </h3>
                  <p class="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Cupiditate ducimus officiis quod! Aperiam eveniet nam
                    nostrum odit quasi ullam voluptatum.
                  </p>
                </div>
              </div>
              <div class="timeline">
                <div class="timeline-icon">
                  <img src="https://img.icons8.com/color/96/000000/css3.png" alt="CSS" />
                </div>
                <div class="timeline-content">
                  <h3 class="title">CASADING STYLE SHEET</h3>
                  <p class="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Cupiditate ducimus officiis quod! Aperiam eveniet nam
                    nostrum odit quasi ullam voluptatum.
                  </p>
                </div>
              </div>
              <div class="timeline">
                <div class="timeline-icon">
                  <img src="https://img.icons8.com/color/96/000000/javascript--v1.png" alt="JS"/>
                </div>
                <div class="timeline-content">
                  <h3 class="title">JAVASCRIPT</h3>
                  <p class="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Cupiditate ducimus officiis quod! Aperiam eveniet nam
                    nostrum odit quasi ullam voluptatum.
                  </p>
                </div>
              </div>
              <div class="timeline">
                <div class="timeline-icon">
                  <img src="https://img.icons8.com/ios-filled/96/000000/jquery.png" alt="JQUERY"/>
                </div>
                <div class="timeline-content">
                  <h3 class="title">JQUERY</h3>
                  <p class="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Cupiditate ducimus officiis quod! Aperiam eveniet nam
                    nostrum odit quasi ullam voluptatum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
