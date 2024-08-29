
export const getSido = async () => {
    try {
      const data = await fetch(
        `/ggi/api/location/area/sds`
      ).then((res) => res.json())
  
      if (!data.success) {
        throw new Error(data.message)  
      }
  
      return data.data.sds
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const getSgg = async (sd: string) => {
    try {
      const data = await fetch(
        `/ggi/api/location/area/${sd}/sggs`
      ).then((res) => res.json())
  
      if (!data.success) {
        throw new Error(data.message)
      }
  
      return data.data.sggs
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const getUmd = async (sd: string, sgg: string) => {
    try {
      const data = await fetch(
        `/ggi/api/location/area/${sd}/${sgg}/umds`
      ).then((res) => res.json())
  
      if (!data.success) {
        throw new Error(data.message)
      }
  
      return data.data.umds
    } catch (error) {
      throw new Error(error)
    }
  }