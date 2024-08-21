import axios from "axios"

export const getSearch = async ({ caseNum, auctionNum }: {
  caseNum: string
  auctionNum: string
}) => {
  try {
    const response = await axios.get(
      `/ggi/api/bid-form/cases/${caseNum}/${auctionNum}`,
    )
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.log(error)
  }
}
