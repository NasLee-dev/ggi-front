'use client'
import { Form } from '@/models/map/Form'
import { useEffect } from 'react'

import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { NaverMap } from '@/models/map/Map'
import { queryKey } from '../sections/hooks/useMap'

interface ArrowProps {
  setIsBoxOpen: React.Dispatch<
    React.SetStateAction<{
      finished: boolean
      usage: boolean
      lowPrice: boolean
      price: boolean
    }>
  >
  isOpenArrow: boolean
  setIsOpenArrow: React.Dispatch<React.SetStateAction<Form>>
  formData: Form
}

export default function Arrow({
  setIsBoxOpen,
  isOpenArrow,
  setIsOpenArrow,
  formData,
}: ArrowProps) {
  const { data: map }: UseQueryResult<NaverMap> = useQuery({
    queryKey: queryKey,
    enabled: false,
  })
  useEffect(() => {
    if (formData.lastFilter === 1) {
      if (isOpenArrow) {
        setIsBoxOpen((prev) => {
          return {
            ...prev,
            finished: true,
          }
        })
      } else {
        setIsBoxOpen((prev) => {
          return {
            ...prev,
            finished: false,
          }
        })
      }
    } else if (formData.lastFilter === 2) {
      if (isOpenArrow) {
        setIsBoxOpen((prev) => {
          return {
            ...prev,
            usage: true,
          }
        })
      } else {
        setIsBoxOpen((prev) => {
          return {
            ...prev,
            usage: false,
          }
        })
      }
    } else if (formData.lastFilter === 3) {
      if (isOpenArrow) {
        setIsBoxOpen((prev) => {
          return {
            ...prev,
            price: true,
          }
        })
      } else {
        setIsBoxOpen((prev) => {
          return {
            ...prev,
            price: false,
          }
        })
      }
    } else if (formData.lastFilter === 4) {
      if (isOpenArrow) {
        setIsBoxOpen((prev) => {
          return {
            ...prev,
            lowPrice: true,
          }
        })
      } else {
        setIsBoxOpen((prev) => {
          return {
            ...prev,
            lowPrice: false,
          }
        })
      }
    }
  }, [isOpenArrow])
  return (
    <div
      style={{
        cursor: map && map?.getZoom() < 15 ? 'not-allowed' : 'pointer',
      }}
      onClick={() => {
        if (map && map?.getZoom() < 15) return
        setIsOpenArrow((prev) => {
          return {
            ...prev,
            isSubFilterBoxOpen: !prev.isSubFilterBoxOpen,
          }
        })
      }}
    >
      {isOpenArrow ? (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.8733 1.35491C18.0274 1.35491 23.0162 6.34374 23.0162 12.4978C23.0162 18.6518 18.0274 23.6406 11.8733 23.6406C5.7193 23.6406 0.730469 18.6518 0.730469 12.4978C0.730469 6.34374 5.7193 1.35491 11.8733 1.35491Z"
            fill="white"
            stroke="#34343D"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.0162 14.2109L11.8733 9.06808L6.73047 14.2109"
            stroke="#34343D"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.3747 23.6412C6.22069 23.6412 1.23187 18.6524 1.23187 12.4983C1.23187 6.3443 6.22069 1.35547 12.3747 1.35547C18.5288 1.35547 23.5176 6.3443 23.5176 12.4983C23.5176 18.6524 18.5288 23.6412 12.3747 23.6412Z"
            fill="white"
            stroke="#34343D"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.23186 10.7852L12.3747 15.928L17.5176 10.7852"
            stroke="#34343D"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}
