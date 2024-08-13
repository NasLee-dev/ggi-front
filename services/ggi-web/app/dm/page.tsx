'use client'
<<<<<<< HEAD
import Info from 'app/dm/components/Info'
import List from 'app/dm/components/List'
import MyDm from 'app/dm/components/MyDM'
import Search from 'app/dm/components/Search'
import { Container, DmContainer } from 'app/dm/components/styles/Boxes'
import { ITabStatus } from '@/models/dm/DM'
import getAuth from '@/remote/dm/auth/getAuth'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface IUser {
  authorities: Array<string>,
  userId: string
}

export default function DmPage (props: any) {
  const token = props.searchParams.token
  const [tabs, setTabs] = useState<ITabStatus>({
    expected: true,
    ongoing: false,
    mine: false
  })

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getAuth(token)
  })

  useEffect(() => {
    if (!token) return
  }, [token])

  return (
    <DmContainer>
      <div id='root-portal'/>
      <Container>
        <Info tabs={tabs} setTabs={setTabs}></Info>
        {tabs.mine ? <MyDm></MyDm> 
        : (<>
          <Search tabs={tabs}></Search> 
          <List></List>
        </>)}
      </Container>
    </DmContainer>
  )
}
=======

import emotionStyled from '@emotion/styled'
import { useState } from 'react'

export default function DmPage() {
  const [isOpen, setIsOpen] = useState(false)
  return <Container isOpen={isOpen}>asdkjl</Container>
}

const Container = emotionStyled.div<{ isOpen: boolean }>`
  background-color: #333333;
  height: ${({ isOpen }) => (isOpen ? 'calc(100% - 60px)' : '0px')};
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`
>>>>>>> upstream/wt
