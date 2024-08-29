import axios from "axios"

export const getBidFormInfoMstSeq = async (mstSeq: string) => {
  try {
    const response = await axios.get(
      `/ggi/api/bid-form/${mstSeq}/checks`,
    )
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.log(error)
  }
}

export const getCaseCheck = async ({ infoId, caseNo, mulSeq }: {
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

export const initBidForm = async ({
  infoId,
  caseNo,
  mulSeq,
  biddingDate,
  biddingTime,
}: {
  infoId: string
  caseNo: string
  mulSeq: string
  biddingDate: string
  biddingTime: string
}) => {
  try {
    const response = await axios.post(
      `/ggi/api/bid-form/inits`,
      {
        infoId,
        caseNo,
        mulSeq,
        biddingDate,
        biddingTime
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
