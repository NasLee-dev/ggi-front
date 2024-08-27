import axios from "axios"
import { AgentProps } from "../models/Agent"

export const getAgent = async (mstSeq: string) => {
  try {
    const response = await axios.get(`/ggi/api/bid-form/${mstSeq}/agents`)
    if (response.data.success) {
      return response.data.data.agent as AgentProps | null
    }
  } catch (error) {
    console.log(error)
  }
}
