import { NaverMap } from 'app/map/models/map/Map'
import { useEffect } from 'react'

const useMapListeners = (
  map: NaverMap,
  onClickCallback: (e: any) => void,
  onMouseMoveCallback: (e: MouseEvent) => void,
  finishCallback: () => void,
) => {
  useEffect(() => {
    if (!map) return

    const clickHandler = naver.maps.Event.addListener(
      map,
      'click',
      onClickCallback,
    )
    const rightClickHandler = naver.maps.Event.addListener(
      map,
      'rightclick',
      finishCallback,
    )
    document.addEventListener('mousemove', onMouseMoveCallback)
    return () => {
      naver.maps.Event.removeListener(clickHandler)
      naver.maps.Event.removeListener(rightClickHandler)
      document.removeEventListener('mousemove', onMouseMoveCallback)
    }
  }, [map, onClickCallback, onMouseMoveCallback, finishCallback])
}

export default useMapListeners
