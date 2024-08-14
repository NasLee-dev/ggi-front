import { InterestFormData } from "@/models/map/Interest";
import { deleteGmInterest, deleteKmInterest, deleteKwInterest } from "@/remote/map/interest/deleteInterest";
import { useMutation } from "@tanstack/react-query";


const useDeleteInterest = (
  type: string,
  formData: InterestFormData,
  toggleInterest: (id: string) => void,
) => {
  return useMutation({
    mutationKey: ['deleteInterest', type, formData], // mutationKey를 설정합니다.
    mutationFn: () => {
      switch (type) {
        case '1':
          return deleteKmInterest(
            (formData.oldInfoId + formData.caseNo + formData.infoNo) as string,
          );
        case '2':
        case '3':
          return deleteGmInterest(formData.goodsId as string);
        case '4':
          return deleteKwInterest(
            (formData.oldInfoId + formData.caseNo) as string,
          );
        default:
          return Promise.reject(new Error('Not Found'));
      }
    },
    onSuccess: (data) => {
      toggleInterest(
        formData.type === 1
          ? ((formData.infoId + formData.caseNo + formData.mulSeq) as string)
          : formData.type === 2 || formData.type === 3
          ? (formData.goodsId as string)
          : ((formData.infoId + formData.caseNo + '0000') as string),
      )
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export default useDeleteInterest
