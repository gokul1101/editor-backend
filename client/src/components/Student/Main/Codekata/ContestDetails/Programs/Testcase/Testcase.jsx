import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import "./Testcase.css";
import Loader from "../../../../../../Images/loader.gif"
import CompilerError from "../CompileError/CompilerError";
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#E1F8FF',

    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const Testcase = () => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <CompilerError/>
      <h6 className='p-2 font-weight-bolder test-case-heading mt-5'>Sample Test Case</h6>
      <div className="position-relative">
        <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className='bg-sucess'>
            <Typography classname="test-case-heading ">
              <img src={Loader} alt="" height={40} className='p-2 rounded-circle' />
              <span className='ml-3'>Test Case 1</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              [5, 10, 15]
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography classname="test-case-heading">


              <button className='btn btn-success'><i className="fas fa-check-circle"></i></button>
              <span className='ml-3'>Test Case 2</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              [5, 10, 15]
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography classname="test-case-heading">

              <button className='btn btn-success'><i className="fas fa-check-circle"></i></button>
              <span className='ml-3'>Test Case 3</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              [5, 10, 15]
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography classname="test-case-heading">

              <button className='btn btn-danger'><i className="fas fa-times-circle"></i></button>
              <span className='ml-3'>Test Case 4</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              [5, 10, 15]
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>


      {/* Hidden test Case Accordian */}



      <h6 className='p-2 font-weight-bolder test-case-heading mt-5'>Hidden Test Case</h6>
      <div className="position-relative">
        <Accordion square expanded={expanded === 'panel5'}>
          <AccordionSummary aria-controls="panel5d-content" id="panel5d-header" className=''>
            <Typography className="test-case-heading w-100 mr-auto">
              <button className='btn btn-danger'><i className="fas fa-times-circle"></i></button>
              <span className='ml-3 text-dark'>Test Case 1</span>
            </Typography>

            <div className='lock-icon p-2 float-right'>
              <i className="fas fa-lock"></i>
            </div>


          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              [5, 10, 15]
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel6'}>
          <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography className="test-case-heading w-100 mr-auto">
              <button className='btn btn-danger'><i className="fas fa-times-circle"></i></button>
              <span className='ml-3 text-dark'>Test Case 2</span>
            </Typography>

            <div className='lock-icon p-2 float-right'>
              <i className="fas fa-lock"></i>
            </div>

          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              [5, 10, 15]
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>



    </div>
  );
}

export default Testcase;