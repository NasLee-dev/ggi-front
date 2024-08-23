
import { GetItemResponse } from 'app/map/models/map/ListItem'
import { getGgItem, getGmItem, getKmItem, getKwItem } from '@/remote/map/selectedItem/getSelectedItem'
import { authInfo } from '@/store/atom/auth'
import { selectedItemAtom } from '@/store/atom/map'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const useHandleSelectedData = () => {
  const setSelectedData = useSetRecoilState(selectedItemAtom)
  const auth = useRecoilValue(authInfo)
  const type = auth?.type
  const idCode = auth?.idCode
  const id = auth?.id
  const handleItemType = (type: string) => {
    switch (type) {
      case '1':
        return 'kmItem'
      case '2':
        return 'gmItem'
      case '3':
        return 'gmItem'
      case '4':
        return 'kwItem'
    }
  }
  const handleSelectedData = () => {
    setTimeout(async () => {
      try {
        let response: GetItemResponse | null = null
        switch (type) {
          case '1':
            response = (await getKmItem(idCode)) || null
            break
          case '2':
            response = (await getGmItem(id)) || null
            break
          case '3':
            response = (await getGgItem(id)) || null
            break
          case '4':
            response = (await getKwItem(idCode)) || null
            break
        }

        if (response && response.success) {
          const { data } = response
          setSelectedData((prev: any) => ({
            ...prev,
            [`${handleItemType(type)}`]: data,
          }))
        }
      } catch (error) {
        console.error(error)
      }
    }, 200)
  }
  return { handleSelectedData }
}

export default useHandleSelectedData
