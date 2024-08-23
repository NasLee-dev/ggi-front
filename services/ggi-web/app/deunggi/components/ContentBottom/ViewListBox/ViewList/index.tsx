import * as S from './style'
import { useRef, useState } from 'react'
import Image from 'next/image'
import DefaultCheckbox from 'app/deunggi/components/commons/checkbox/DefaultCheckbox'
import DownloadIcon from './DownloadIcon'
import { useViewDataStore } from '@/store/useDeunggiStore'

export default function ViewList({
  data,
  index,
}: {
  data: any
  index: number
}) {
  const { setViewData, isChecked } = useViewDataStore()

  const checkboxRef = useRef<HTMLInputElement>(null)

  const handleClickCheckbox = () => {
    if (checkboxRef.current) {
      setViewData(data)
    }
  }

  return (
    <S.TableLi>
      <S.TableValue width="7.66%" mobileWidth="55px">
        <DefaultCheckbox
          id={`checkbox${index}`}
          ref={checkboxRef}
          onChange={handleClickCheckbox}
          isCheck={isChecked(data)}
        />
      </S.TableValue>
      <S.TableValue width="16.08%" mobileWidth="140px">
        {data.time}
      </S.TableValue>
      <S.TableValue width="10.16%" mobileWidth="90px">
        {data.type}
      </S.TableValue>
      <S.TableValue width="44.25%" mobileWidth="410px">
        {data.address}
      </S.TableValue>
      <S.TableValue width="12%" mobileWidth="108px">
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
      <S.TableValue width="9.58%" mobileWidth="85px">
        <S.DownloadButton disabled={data.status !== '열람'}>
          <DownloadIcon disabled={data.status !== '열람'} />
        </S.DownloadButton>
      </S.TableValue>
    </S.TableLi>
  )
}