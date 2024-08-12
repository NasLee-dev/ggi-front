'use client'
import Info from 'app/dm/components/Info'
import List from 'app/dm/components/List'
import MyDm from 'app/dm/components/MyDM'
import Search from 'app/dm/components/Search'
import { Container, DmContainer } from 'app/dm/components/styles/Boxes'
import { ITabStatus } from '@/models/dm/DM'
import getAuth from '@/remote/dm/auth/getAuth'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ChaProvider from './components/layout/ChaProvider'

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
    <ChaProvider>
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
    </ChaProvider>
  )
}
