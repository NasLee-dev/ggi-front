import axios from 'axios'

type Mandate = {
  peopleSeq: number
  name: string
  mandateYn: string
}

interface MandateProps {
  mstSeq: string
  bidderNum: number
  mandates: Mandate[]
}

export const putMandates = async ({ mstSeq, bidderNum, mandates }: MandateProps) => {
  try {
    const response = await axios.put(
      `/ggi/api/bid-form/${mstSeq}/bidders/mandates`,
      {
        bidderCount: bidderNum,
        mandates: mandates,
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