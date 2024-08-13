import { InterestFormData, UpdatedInterest } from "@/models/map/Interest"
import { putGmInterest, putKmInterest, putKwInterest } from "@/remote/map/interest/putInterest";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react"


const usePutInterest = (
  type: string,
  formData: InterestFormData,
  setUpdatedInterest: Dispatch<SetStateAction<UpdatedInterest>>,
) => {
  return useMutation({
    mutationKey: ['updateInterest', type, formData], // mutationKey를 설정합니다.
    mutationFn: () => {
      switch (type) {
        case '1':
          return putKmInterest({
            infoId: formData.infoId,
            caseNo: formData.caseNo as string,
            mulSeq: formData.mulSeq,
            infoNo: formData.infoNo as string,
            oldInfoId: formData.oldInfoId,
            isNewCategory: formData.isNewCategory,
            interestInfo: formData.interestInfo,
            smsNotificationYn: formData.smsNotificationYn,
            isWait: formData.isWait,
          });
        case '2':
        case '3':
          return putGmInterest({
            goodsId: formData.goodsId as string,
            manageNo: formData.manageNo as string,
            isNewCategory: formData.isNewCategory,
            interestInfo: formData.interestInfo,
          });
        case '4':
          return putKwInterest({
            infoId: formData.infoId,
            caseNo: formData.caseNo as string,
            oldInfoId: formData.oldInfoId,
            isNewCategory: formData.isNewCategory,
            interestInfo: formData.interestInfo,
          });
        default:
          return Promise.reject(new Error('Not Found'));
      }
    },
    onSuccess: (data) => {
      setUpdatedInterest(data);
    },
  });
}

export default usePutInterest
