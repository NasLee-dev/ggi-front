import axios from "axios"
import { BiddersProps } from "../models/Bidder"

export const getBidders = async (mstSeq: string) => {
  try {
    const response = await axios.get(
      `/ggi/api/bid-form/${mstSeq}/bidders`,
    )
    if (response.data.success) {
      return response.data.data.bidders as BiddersProps[]
    }
  } catch (error) {
    console.log(error)
  }
}
