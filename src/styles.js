import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  align-items: center;
  margin-top: 5vh;
`

export const Container = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 40px;
  margin-left: 40px;
  justify-content: flex-start;
`

export const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  top: 0;
  left: 0;
`

export const StyledButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
  border: 5px solid #157A6E;
  border-radius: 40px;
  box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
  cursor: pointer;
  padding: 5px 10px;
  transition: all 0.3s ease;
  &:hover {
    border-color: #499F68;
    transform: scale(1.03);
  }
`
