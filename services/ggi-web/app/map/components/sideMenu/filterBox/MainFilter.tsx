import Flex from 'app/map/components/shared/Flex'
import { Form } from 'app/map/models/map/Form'
import { css } from '@emotion/react'
import { FILTERS } from 'app/map/constants/map'
import { Dispatch, SetStateAction } from 'react'
import { colors } from 'app/styles/colorPallette'
import FilterProps from './FilterProps'

interface SearchBoxProps {
  formData: Form
  setFormData: Dispatch<SetStateAction<Form>>
  setOpenOverlay: Dispatch<SetStateAction<boolean>>
}

export default function MainFilter({
  formData,
  setFormData,
  setOpenOverlay,
}: SearchBoxProps) {
  return (
    <Flex
      justify="center"
      direction="row"
      css={ContainerStyle}
      onClick={() => {
        setOpenOverlay(false)
      }}
      style={{
        width: '100%',
        height: '47px',
        backgroundColor: 'white',
        gap: '10px',
        border: 'none',
        zIndex: '100',
      }}
    >
      <FilterProps
        dataType={formData.km}
        colorType={colors.white}
        bgColorType={colors.kmBlue}
        onButtonClick={() => setFormData({ ...formData, km: !formData.km })}
        textType={FILTERS.AUTION}
      />
      <FilterProps
        dataType={formData.kw}
        colorType={colors.white}
        bgColorType={colors.kwGreen}
        onButtonClick={() => setFormData({ ...formData, kw: !formData.kw })}
        textType={FILTERS.EXPECTED}
      />
      <FilterProps
        dataType={formData.gm}
        colorType={colors.white}
        bgColorType={colors.gmBlue}
        onButtonClick={() => setFormData({ ...formData, gm: !formData.gm })}
        textType={FILTERS.CAMCO}
      />
      <FilterProps
        dataType={formData.gg}
        colorType={colors.white}
        bgColorType={colors.ggPurple}
        onButtonClick={() => setFormData({ ...formData, gg: !formData.gg })}
        textType={FILTERS.SOLD}
      />
    </Flex>
  )
}

const ContainerStyle = css`
  width: 100%;
  height: 47px;
  background-color: white;
  gap: 10px;
  border: none;
  z-index: 100;
`
