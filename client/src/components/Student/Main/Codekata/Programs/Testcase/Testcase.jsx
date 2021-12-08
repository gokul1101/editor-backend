import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import "../Testcase/Testcase.css";
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

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className='bg-sucess'>
          <Typography classname="test-case-heading ">
              <button className='btn btn-danger'>Failed</button>
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
              
              
          <button className='btn btn-success'>sucess</button>
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
              
          <button className='btn btn-success'>sucess</button>
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
              
          <button className='btn btn-danger'>Failed</button>
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
  );
}