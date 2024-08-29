import styled from "@emotion/styled";

export const MyDmBox = styled.span<{ bgColor: string }>`
  width: auto;
  height: 38px;
  border-radius: 999px;
  padding: 8px 10px;
  background-color: ${({ bgColor }) => (bgColor)};
  margin: 5px;
  box-sizing: border-box;
`