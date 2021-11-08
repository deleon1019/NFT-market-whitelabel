import styled, { css } from 'styled-components';

export const HiddenShell = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: none;
`;

export const HiddenInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  filter: alpha(opacity=0);
  -ms-filter: 'alpha(opacity=0)';
  -khtml-opacity: 0;
  -moz-opacity: 0;
  cursor: pointer;
`;

export const InputShell = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 6.4rem;
`;

export const InputLabel = styled.h4`
  font-family: 'Airbnb Cereal App Bold';
  font-size: 2rem;
  line-height: 1.3;
  margin: 0;
`;

const InputStyle = css<{
  isError?: boolean;
}>`
  width: 100%;
  background: #f7f7f7;
  border: 0.2rem solid;
  border-color: ${({ isError }) => (isError ? '#ff5555' : 'rgba(0, 0, 0, 0)')};
  border-radius: 0.8rem;
  font-family: 'Airbnb Cereal App Book';
  font-size: 1.6rem;
  margin-top: 1.6rem;
  outline: none;
  padding: 1.6rem;

  &:focus {
    border: 0.2rem solid;
    border-color: ${({ isError }) => (isError ? '#ff5555' : '#7417EA')};
  }

  &::placeholder {
    color: #c1c1c1;
  }
`;

export const Input = styled.input<{ isError?: boolean }>`
  ${InputStyle}
`;

export const Textarea = styled.textarea`
  ${InputStyle}

  flex: 1;
  resize: none;
`;
