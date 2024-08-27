import { css } from '@emotion/react'
import Flex from '../shared/Flex'
import Input from '../shared/Input'
import { Dispatch, SetStateAction, useCallback } from 'react'
import Star5 from './icons/star5'
import Star4 from './icons/star4'
import Star3 from './icons/star3'
import Star2 from './icons/star2'
import Star1 from './icons/star1'
import Star0 from './icons/star0'
import { InterestFormData } from 'app/map/models/map/Interest'

interface GroupElementsProps {
  formData: InterestFormData
  setFormData: Dispatch<SetStateAction<InterestFormData>>
}

export default function GroupElements({
  formData,
  setFormData,
}: GroupElementsProps) {
  const handleChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setFormData({
        ...formData,
        importance: value,
        interestInfo: {
          ...formData.interestInfo,
          starRating: value,
        },
      })
    },
    [formData, setFormData],
  )
  return (
    <Flex css={ContainerStyle}>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={() => {
          setFormData({
            ...formData,
            importance: '0',
            interestInfo: {
              ...formData.interestInfo,
              starRating: '0',
            },
          })
        }}
      >
        <Input
          type="radio"
          css={RadioBtnStyle}
          name="check"
          value={'0'}
          id="check0"
          checked={formData.interestInfo.starRating === '0'}
          onChange={(e) => {
            handleChecked(e)
          }}
        />
        <Star0 />
      </div>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          cursor: 'pointer',
        }}
        onClick={() => {
          setFormData({
            ...formData,
            importance: '1',
            interestInfo: {
              ...formData.interestInfo,
              starRating: '1',
            },
          })
        }}
      >
        <Input
          type="radio"
          css={RadioBtnStyle}
          name="check"
          id="check1"
          value={'1'}
          checked={formData.interestInfo.starRating === '1'}
          onChange={(e) => {
            handleChecked(e)
          }}
        />
        <Star1 />
      </div>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          cursor: 'pointer',
        }}
        onClick={() => {
          setFormData({
            ...formData,
            importance: '2',
            interestInfo: {
              ...formData.interestInfo,
              starRating: '2',
            },
          })
        }}
      >
        <Input
          type="radio"
          css={RadioBtnStyle}
          name="check"
          id="check2"
          value={'2'}
          checked={formData.interestInfo.starRating === '2'}
          onChange={(e) => {
            handleChecked(e)
          }}
        />
        <Star2 />
      </div>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          cursor: 'pointer',
        }}
        onClick={() => {
          setFormData({
            ...formData,
            importance: '3',
            interestInfo: {
              ...formData.interestInfo,
              starRating: '3',
            },
          })
        }}
      >
        <Input
          type="radio"
          css={RadioBtnStyle}
          name="check"
          id="check3"
          value={'3'}
          checked={formData.interestInfo.starRating === '3'}
          onChange={(e) => {
            handleChecked(e)
          }}
        />
        <Star3 />
      </div>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          cursor: 'pointer',
        }}
        onClick={() => {
          setFormData({
            ...formData,
            importance: '4',
            interestInfo: {
              ...formData.interestInfo,
              starRating: '4',
            },
          })
        }}
      >
        <Input
          type="radio"
          css={RadioBtnStyle}
          name="check"
          id="check4"
          value={'4'}
          checked={formData.interestInfo.starRating === '4'}
          onChange={(e) => {
            handleChecked(e)
          }}
        />
        <Star4 />
      </div>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          cursor: 'pointer',
        }}
        onClick={() => {
          setFormData({
            ...formData,
            importance: '5',
            interestInfo: {
              ...formData.interestInfo,
              starRating: '5',
            },
          })
        }}
      >
        <Input
          type="radio"
          css={RadioBtnStyle}
          name="check"
          id="check5"
          value={'5'}
          checked={formData.interestInfo.starRating === '5'}
          onChange={(e) => {
            handleChecked(e)
          }}
        />
        <Star5 />
      </div>
    </Flex>
  )
}

const ContainerStyle = css`
  width: 95%;
  height: 100%;
  flex-direction: row;
  gap: 10px;
  position: relative;
`

const RadioBtnStyle = css`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid #bdbdbd;
  background-color: #ffffff;
  margin-right: 5px;
  cursor: pointer;
`
