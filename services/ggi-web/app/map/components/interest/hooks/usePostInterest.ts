import { InterestFormData, UpdatedInterest } from "app/map/models/map/Interest"
import { postGmInterest, postKmInterest, postKwInterest } from "@/remote/map/interest/postInterest"
import { useMutation } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"


const usePostInterest = (
  type: string,
  formData: InterestFormData,
  setUpdatedInterest: Dispatch<SetStateAction<UpdatedInterest>>,
  toggleInterest: (id: string) => void,
) => {
  return useMutation({
    mutationKey: ['postInterest', type, formData],
    mutationFn: () => {
      switch (type) {
        case '1':
          return postKmInterest({
            infoId: formData.infoId,
            caseNo: formData.caseNo as string,
            mulSeq: formData.mulSeq,
            infoNo: formData.infoNo as string,
            oldInfoId: formData.oldInfoId,
            isNewCategory: formData.isNewCategory,
            interestInfo: {
              ...formData.interestInfo,
              starRating: formData.importance === '' ? '0' : formData.importance,
            },
            smsNotificationYn: formData.smsNotificationYn,
            isWait: formData.isWait,
          });
        case '2':
        case '3':
          return postGmInterest({
            goodsId: formData.goodsId as string,
            manageNo: formData.manageNo as string,
            isNewCategory: formData.isNewCategory,
            interestInfo: {
              ...formData.interestInfo,
              starRating: formData.importance === '' ? '0' : formData.importance,
            },
          });
        case '4':
          return postKwInterest({
            infoId: formData.infoId,
            caseNo: formData.caseNo as string,
            oldInfoId: formData.oldInfoId,
            isNewCategory: formData.isNewCategory,
            interestInfo: {
              ...formData.interestInfo,
              starRating: formData.importance === '' ? '0' : formData.importance,
            },
          });
        default:
          return Promise.reject(new Error('Not Found'));
      }
    },
    onSuccess: (data) => {
      setUpdatedInterest(data);
      toggleInterest(
        formData.type === 1
          ? (formData.infoId + formData.caseNo + formData.mulSeq) as string
          : formData.type === 2 || formData.type === 3
          ? (formData.goodsId as string)
          : (formData.infoId + formData.caseNo + formData.mulSeq) as string,
      );
    },
  });
}

export default usePostInterest
