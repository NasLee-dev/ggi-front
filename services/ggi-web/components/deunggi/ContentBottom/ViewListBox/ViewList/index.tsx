import DefaultCheckbox from '@/components/commons/checkbox/DefaultCheckbox'
import * as S from './style'
import { useRef, useState } from 'react'
import DownloadIcon from '@/components/deunggi/ContentBottom/ViewListBox/ViewList/DownloadIcon'
import Image from 'next/image'

export default function ViewList({
  data,
  index,
}: {
  data: any
  index: number
}) {
  const [isCheck, setIsCheck] = useState(false)

  const checkboxRef = useRef<HTMLInputElement>(null)

  const handleClickCheckbox = () => {
    if (checkboxRef.current) {
      const isChecked = checkboxRef.current.checked
      setIsCheck(isChecked)
    }
  }

  return (
    <S.TableLi>
      <S.TableValue width="7.66%">
        <DefaultCheckbox
          id={`checkbox${index}`}
          ref={checkboxRef}
          onChange={handleClickCheckbox}
          isCheck={isCheck}
        />
      </S.TableValue>
      <S.TableValue width="16.08%">{data.time}</S.TableValue>
      <S.TableValue width="10.16%">{data.type}</S.TableValue>
      <S.TableValue width="44.25%">{data.address}</S.TableValue>
      <S.TableValue width="12%">
        {data.status === '열람' ? (
          <S.PdfButton>
            <Image
              width={40}
              height={40}
              src="/images/pdf.png"
              alt="pdf아이콘"
            />
          </S.PdfButton>
        ) : (
          data.status
        )}
      </S.TableValue>
      <S.TableValue width="9.58%">
        <S.DownloadButton disabled={data.status !== '열람'}>
          <DownloadIcon disabled={data.status !== '열람'} />
        </S.DownloadButton>
      </S.TableValue>
    </S.TableLi>
  )
}
