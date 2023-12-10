import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Загрузка аутентифицированного пользователя

  const { isLoading, isAuthenticated } = useUser();

  //2. Если нет аутентифицированного пользователя, то сделать редирект на login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  //3.Спиннер пока загружается

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. Отобразить приложение
  if (isAuthenticated) return children;
}
