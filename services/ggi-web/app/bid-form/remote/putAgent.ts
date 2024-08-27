import axios from "axios"

interface PutAgentProps {
  mstSeq: string
  name: string
  relationship: string
  phoneNo: string
  address: string
  job: string
}

export const putAgent = async ({ mstSeq, name, relationship, phoneNo, address, job }: PutAgentProps) => {
  try {
    const response = await axios.put(
      `/ggi/api/bid-form/${mstSeq}/agents`,
      {
        name: name,
        relationship: relationship,
        phoneNo: phoneNo,
        address: address,
        job: job ?? '',
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
