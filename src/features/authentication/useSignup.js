import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        'Аккаунт успешно создан! Пожалуйста подтвердите учётную запись на электронной почте',
      );
    },
  });

  return { signup, isLoading };
}
