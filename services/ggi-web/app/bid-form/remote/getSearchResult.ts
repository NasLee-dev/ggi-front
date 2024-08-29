import axios from "axios"

export const getSearchResult = async ({ infoId, caseNo, mulSeq }: {
  infoId: string
  caseNo: string
  mulSeq: string
}) => {
  try {
    const response = await axios.post(
      `/ggi/api/bid-form/cases/checks`,
      {
        infoId: infoId,
        caseNo: caseNo,
        mulSeq: mulSeq,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.log(error)
  }
}
