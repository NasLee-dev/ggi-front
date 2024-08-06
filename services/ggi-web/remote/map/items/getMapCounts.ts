import { MapCountsResponse } from "@/models/MapItem"
import { MapCountsParams } from "@/models/Params"

export const postMapCounts = async (formData: MapCountsParams) => {
  const errorCode400Regex = /^400\d{2}$/;
  let ok = false;
  try {
    const response = await fetch('/ggi/api/map/map-counts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error('Network response was not ok')
    const result = await response.json()
    if (result.success) {
      return result.data.data
    } else {
      if (errorCode400Regex.test(result.data.code.toString()) && !ok) {
        ok = true;
        setTimeout(() => {
          // alert('지도 검색은 유료서비스 입니다. 로그인 후 이용해주세요.');
          // window.close();
        }, 500);
      }
    } 
  } catch (error) {
    console.error('An error occurred:', error)
    throw new Error('An error occurred:')
  }
}