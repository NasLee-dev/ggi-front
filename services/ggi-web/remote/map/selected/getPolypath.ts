import axios from 'axios'

export default async function getPolypath(x: number, y: number) {
  try {
    const response = await axios.get(
      `/MapAppServer/DWService?req={'header' : {'format' : 'JSON', 'key' : ${process.env.NEXT_PUBLIC_DAWUL_API_KEY}, 'serviceName' : 'REVERSE_GEOCODING'}, 'body' : {'crs' : 'GRS_80', 'point' : '${x}, ${y}', 'adminType' : 'JIBUN_ADDRESS', 'spatialOperation' : 'INTERSECT', 'selectFields' : {'geoType' : 'ORIGIN'}}}`,
    )
    return response.data.body.geojson.features[0].geometry.coordinates[0]
  } catch (error) {
    console.error(error)
  }
}
