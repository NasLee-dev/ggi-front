
export const getCourt1s = async () => {
    try {
      const data = await fetch(
        `/ggi/api/location/court1s`
      ).then((res) => res.json())
  
      if (!data.success) {
        throw new Error(data.message)
      }
  
      return data.data.courts
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const getCourt2s = async (code1: string) => {
    try {
      const data = await fetch(
        `/ggi/api/location/${code1}/court2s`
      ).then((res) => res.json())
  
      if (!data.success) {
        throw new Error(data.message)
      }
  
      return data.data.courts
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const getCourt3s = async (code1: string, code2: string) => {
    try {
      const data = await fetch(
        `/ggi/api/location/${code1}/${code2}/court3s`
      ).then((res) => res.json())
  
      if (!data.success) {
        throw new Error(data.message)
      }
  
      return data.data.courts
    } catch (error) {
      throw new Error(error)
    }
  }