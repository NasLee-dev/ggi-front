<<<<<<< HEAD
=======

>>>>>>> 0e5b7f72b62cb4705a6d53727430016d0e20475b
import { Select } from "@chakra-ui/react"
import { theme } from "./theme"
import { UpDownIcon } from "@chakra-ui/icons"

<<<<<<< HEAD
=======

>>>>>>> 0e5b7f72b62cb4705a6d53727430016d0e20475b
interface ISelectProps {
  options: Array<{
    value?: string,
    name: string
  }>
  noMargin?: boolean,
  wider?: boolean
}

export default function StyledSelect({
  options,
  noMargin,
  wider
}: ISelectProps) {

  return (
<<<<<<< HEAD
    <Select 
      size={'lg'} 
      minWidth={'190px'}
      width={wider ? '326.5px' :'auto'}
      maxWidth={'335px'}
      height={'50px'}
      border={`1px solid ${theme.palette.graySecondary}`}
      borderRadius={'16px'}
      marginRight={noMargin ? `0` :`5px`}
      icon={<UpDownIcon fontSize={'12px'} color={`${theme.palette.grayMain}`} />}
    >
      {options.length && options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
=======
    // <Select 
    //   size={'lg'} 
    //   minWidth={'190px'}
    //   width={wider ? '326.5px' :'auto'}
    //   maxWidth={'335px'}
    //   height={'50px'}
    //   border={`1px solid ${theme.palette.graySecondary}`}
    //   borderRadius={'16px'}
    //   marginRight={noMargin ? `0` :`5px`}
    //   icon={<UpDownIcon fontSize={'12px'} color={`${theme.palette.grayMain}`} />}
    // >
    //   {options.length && options.map((option, idx) => (
    //     <option key={idx} value={option.value}>
    //       {option.name}
    //     </option>
    //   ))}
    // </Select>
    <div></div>
>>>>>>> 0e5b7f72b62cb4705a6d53727430016d0e20475b
  )
}