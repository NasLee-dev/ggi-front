import { InterestFormData } from '@/models/map/Interest'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Flex from '../../shared/Flex'
import Text from '../../shared/Text'
import Spacing from '../../shared/Spacing'
import Input from '../../shared/Input'

interface NoGroupBtnProps {
  openGroup: boolean
  setOpenGroup: React.Dispatch<React.SetStateAction<boolean>>
  formData: InterestFormData
  setFormData: React.Dispatch<React.SetStateAction<InterestFormData>>
  handleDuplicatedGroupName: (groupName: string) => void
}

export default function NoGroupBtn({
  openGroup,
  setOpenGroup,
  formData,
  setFormData,
  handleDuplicatedGroupName,
}: NoGroupBtnProps) {
  const [isFocus, setIsFocus] = useState(false)
  const [groupName, setGroupName] = useState('')
  const categoriesFromIndex5 = formData?.categories?.slice(4) || []
  const rows = []
  for (let i = 0; i < categoriesFromIndex5.length; i += 4) {
    rows.push(categoriesFromIndex5.slice(i, i + 4))
  }

  const handleCategorySort = (categories: string[]) => {
    if (formData) {
      let newCategory = []
      for (const a of categories) {
        if (a === '미분류') {
          newCategory.unshift(a)
        } else {
          newCategory.push(a)
        }
      }
      return newCategory
    }
  }
  useEffect(() => {
    if (formData.categories.length === 0) {
      setGroupName('미분류')
      setFormData((prev) => ({
        ...prev,
        isNewCategory: false,
        categories: ['미분류'],
        interestInfo: {
          ...prev.interestInfo,
          category: '미분류',
        },
      }))
    } else {
      const sortedCategories = handleCategorySort(formData.categories)
      if (sortedCategories?.join(',') !== formData.categories.join(',')) {
        setFormData((prev) => {
          return {
            ...prev,
            categories: sortedCategories || [],
          }
        })
      }
      setGroupName(
        formData.interestInfo.category === ''
          ? '미분류'
          : formData.interestInfo.category,
      )
    }
  }, [formData.categories])

  return (
    <div
      css={scrollBarStyle}
      style={{
        display: 'flex',
        flexDirection: 'column',

        height: '107px',
      }}
    >
      <ContainerStyle>
        <Flex
          direction="row"
          style={{
            width: '510px',
          }}
        >
          {isFocus ? (
            <InputStyle
              placeholder="그룹이름"
              onClick={() => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    isNewCategory: true,
                  }
                })
              }}
              onChange={(e) => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    isNewCategory: true,
                    interestInfo: {
                      ...prev.interestInfo,
                      category: e.target.value,
                    },
                  }
                })
                setGroupName(e.target.value)
              }}
              onBlur={(e) => {
                handleDuplicatedGroupName(e.target.value)
              }}
            />
          ) : (
            <ButtonStyle
              onClick={() => {
                setIsFocus(true)
                setFormData((prev) => {
                  return {
                    ...prev,
                    isNewCategory: true,
                  }
                })
              }}
            >
              <Text
                css={ButtonTextStyle}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {isFocus ? '' : groupName}
              </Text>
              <Flex>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M1 1L11 11M11 1L1 11"
                    stroke="#8C8C8C"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Flex>
            </ButtonStyle>
          )}
          <Spacing direction="horizontal" size={10} />
          <Input
            type="radio"
            name="newGroup"
            style={{
              width: '15px',
              height: '15px',
              marginTop: '5px',
              marginRight: '5px',
            }}
            disabled={isFocus ? false : true}
            onClick={() => {
              setIsFocus(true)
            }}
            onChange={(e) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  isNewCategory: true,
                }
              })
            }}
            checked={isFocus ? true : false}
          />
          <Text
            css={NewGroupRadioStyle}
            style={{
              color: isFocus ? '#000001' : '#8C8C8C',
            }}
          >
            새 그룹으로 등록
          </Text>
        </Flex>
        <Flex
          style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          onClick={() => {
            setOpenGroup(!openGroup)
          }}
        >
          <Text css={GroupListStyle}>
            {!openGroup ? '그룹 목록 열기' : '그룹 목록 닫기'}
          </Text>
        </Flex>
      </ContainerStyle>
      <Spacing size={20} />
      <div
      css={scrollBarStyle}
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <ContainerStyle
          style={{
            gap: '40px',
          }}
        >
          {formData?.categories?.slice(0, 4).map((category, index) => (
            <Flex
              key={index}
              style={{
                width: '110px',
                gap: '5px',
                justifyContent: 'start',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                setIsFocus(false)
                setGroupName(category)
              }}
            >
              <Input
                type="radio"
                name="newGroup"
                defaultChecked={
                  !isFocus && groupName === '미분류' ? true : false
                }
                checked={!isFocus && groupName === category ? true : false}
                style={{
                  width: '15px',
                  height: '15px',
                  marginTop: '5px',
                }}
                onChange={() => {
                  setGroupName(category)
                  setFormData((prev) => {
                    return {
                      ...prev,
                      isNewCategory: false,
                      interestInfo: {
                        ...prev.interestInfo,
                        category: category,
                      },
                    }
                  })
                }}
              />
              <Text
                css={NewGroupRadioStyle}
                style={{
                  width: '90px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {category}
              </Text>
            </Flex>
          ))}
        </ContainerStyle>
        {!openGroup ? null : (
          <ContainerStyle
            style={{
              flexDirection: 'column',
            }}
          >
            {rows.map((row, index) => (
              <ContainerStyle
                key={index}
                style={{
                  gap: '40px',
                }}
              >
                {row.map((category, index) => (
                  <CategoryFlex
                    key={index}
                    style={{
                      width: '110px',
                      gap: '5px',
                      justifyContent: 'start',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setIsFocus(false)
                      setGroupName(category)
                      setFormData((prev) => {
                        return {
                          ...prev,
                          isNewCategory: false,
                          interestInfo: {
                            ...prev.interestInfo,
                            category: category,
                          },
                        }
                      })
                    }}
                  >
                    <Input
                      type="radio"
                      name="newGroup"
                      checked={
                        !isFocus && groupName === category ? true : false
                      }
                      style={{
                        width: '15px',
                        height: '15px',
                        marginTop: '5px',
                      }}
                      onChange={() => {
                        setGroupName(category)
                        setFormData((prev) => {
                          return {
                            ...prev,
                            isNewCategory: false,
                            interestInfo: {
                              ...prev.interestInfo,
                              category: category,
                            },
                          }
                        })
                      }}
                    />
                    <Text
                      css={NewGroupRadioStyle}
                      style={{
                        width: '90px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {category}
                    </Text>
                  </CategoryFlex>
                ))}
              </ContainerStyle>
            ))}
          </ContainerStyle>
        )}
      </div>
    </div>
  )
}

const ContainerStyle = styled.div`
  width: 600px;
  flex-direction: row;
  position: relative;
  display: flex;
`

const ButtonStyle = styled.button`
  display: flex;
  width: 135px;
  height: 30px;
  padding: 4px 8px 4px 4px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  border: 1px solid #2a62c5;
  background: #fff;
  flex-direction: row;
`

const InputStyle = styled.input`
  display: flex;
  width: 135px;
  padding: 4px 8px 4px 4px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  border: 1px solid #2a62c5;
  background: #fff;
  text-align: center;
  color: #2a62c5;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.32px;
  &:focus {
    outline: none;
  }
`

const ButtonTextStyle = css`
  color: #216cff;
  text-align: center;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.32px;
`

const NewGroupRadioStyle = css`
  color: #000001;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%;
  letter-spacing: -0.32px;
  margin-top: 2px;
`

const GroupListStyle = css`
  color: #0075b1;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 125%;
  letter-spacing: -0.32px;
`

const CategoryFlex = styled(Flex)`
  width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const scrollBarStyle = css`
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #dfdfdf;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  & {
    scrollbar-width: thin;
    scrollbar-color: #dfdfdf #fff;
  }

  &:hover {
    scrollbar-color: #555 #fff;
  }
`
