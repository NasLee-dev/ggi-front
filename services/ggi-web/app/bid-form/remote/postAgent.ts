import axios from "axios"

interface AgentForm {
  name: string
  relationship: string
  phoneNo: string
  address: string
  job: string
}

export const postAgent = async (mstSeq: string, formData: AgentForm) => {
  try {
    const response = await axios.post(
      `/ggi/api/bid-form/${mstSeq}/agents`,
      {
        name: formData.name,
        relationship: formData.relationship,
        phoneNo: formData.phoneNo,
        address: formData.address,
        job: formData.job ?? '',
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
