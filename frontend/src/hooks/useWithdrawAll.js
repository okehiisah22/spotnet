import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from 'utils/axios';
import { notify } from 'components/layout/notifier/Notifier';
import {sendWithdrawAllTransaction} from "../services/transaction";

const useWithdrawAll = () => {
  const mutation = useMutation({
    mutationFn: async (walletId) => {
      if (!walletId) throw new Error('Wallet ID is required.');
      const {data: prepare_data} = await axiosInstance.get(`/api/get-withdraw-all-data?wallet_id=${walletId}`);

      const { transaction_hash } = await sendWithdrawAllTransaction(prepare_data, prepare_data.contract_address);

      // TODO: Discuss with Oleh what to do after transaction
    },
    onSuccess: () => {
      notify('Withdraw All operation completed successfully!', 'success');
    },
    onError: (error) => {
      notify(error?.message || 'Failed to complete the Withdraw All operation.', 'error');
    },
  });

  return {
    withdrawAll: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export default useWithdrawAll;
