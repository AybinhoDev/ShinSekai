import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/core';
import Select from 'react-dropdown-select';

const WithAnimation = ({ options, title }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [open, setOpen] = useState(null);

  return (
    <React.Fragment>
      <StyledSelect
        multi
        options={options}
        values={[]}
        isOpen={open}
        color="#00b894"
        onDropdownCloseRequest={({ close }) => {
          setOpen(true);
          sleep(300).then(() => {
            close();
            setOpen(false);
          });
        }}
        onChange={(value) =>
          console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
        }
      />
    </React.Fragment>
  );
};

const hide = keyframes`
  from {
    transition: height 310ms ease;
  }
  to {
    transition: height 310ms ease;
    height: 0;
    opacity: 0;
  }
`;

const show = keyframes`
  from {
    transition: height 310ms ease;
    height: 0;
    opacity: 0;
  }
  to {
    transition: height 310ms ease;
  }
`;

const StyledSelect = styled(Select)`
  transition: all 0.3s ease-out;
  .react-dropdown-select-dropdown {
    height: 310px;
    ${({ isOpen }) =>
      isOpen
        ? css`
            animation: ${hide} 310ms ease-in-out;
          `
        : css`
            animation: ${show} 310ms ease-in-out;
          `};
  }
  .react-dropdown-select-option {
    transition: all 0.3s ease-out;
  }
`;

WithAnimation.propTypes = {};

export default WithAnimation;