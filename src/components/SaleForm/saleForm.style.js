import styled from '@emotion/styled'

export const FormContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr, 4);
  grid-row-gap: 10px;
  max-width: 300px;
  padding: 20px;
  margin: 0 auto;
`

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin: 20% auto 0;
  max-width: 40%;
  width: fit-content;
`

export const MultiButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  column-gap: 5px;
  margin-top: 10px;
`

export const TextEmphasis = styled.span`
  font-weight: bold;
  color: red;
`
