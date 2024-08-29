import { useState } from "react";
import { InputBox } from "./style";

interface IInputProps {
  width: string
  value: string
  changeInput: (value: string) => void
}
export default function ModalInput ({
  width,
  value,
  changeInput
}: IInputProps) {
  const [newCondition, setNewCondition] = useState<string>(value)

  const handleChangeInput = (e: any) => {
    setNewCondition(e.target.value)
    changeInput(e.target.value)
  }

  return (
    <InputBox 
      width={width}
      value={newCondition}
      onChange={handleChangeInput}
    />
  )
}