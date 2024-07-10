'use client';
import { ChangeEvent, useState } from 'react';
import { LoginInput } from './LoginInput';
import QueryButton from '../general/QueryButton';
import { QueryProvider } from '../general/QueryProvider';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { COOKIES_NAME } from '@/utils/constants';
import { useMutation } from '@/utils/hooks';
import { useForm } from 'react-hook-form';
import { getErrorMessage } from '@/utils/helper';
import { Alert } from '../general/Alert';
import { IApiResponse, ILoginRequest, ILoginResponse } from '@/interfaces';
import { login } from '@/services/api';

export const LoginForm = QueryProvider(() => {
  // STATES
  const [showAlert, setShowALert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  // FORMS
  const { getValues, setValue } = useForm<ILoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // HANDLERS
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate(getValues());
  };

  const handleOnLoginSuccess = (data: ILoginResponse) => {
    setCookie(COOKIES_NAME.ADMIN_ACCESS_TOKEN_SERVER, data.accessToken, {
      expires: new Date(data.accessTokenExpiredDate),
    });
    setCookie(COOKIES_NAME.ADMIN_REFRESH_TOKEN_SERVER, data.refreshToken, {
      expires: new Date(data.accessTokenExpiredDate),
    });
    setCookie(COOKIES_NAME.ACCESS_TOKEN_SERVER, data.accessToken, {
      expires: new Date(data.accessTokenExpiredDate),
      domain: process.env.NEXT_PUBLIC_FO_DOMAIN,
    });
    setCookie(COOKIES_NAME.REFRESH_TOKEN_SERVER, data.refreshToken, {
      expires: new Date(data.accessTokenExpiredDate),
      domain: process.env.NEXT_PUBLIC_FO_DOMAIN,
    });
    const redirect = getCookie(COOKIES_NAME.ADMIN_REDIRECT);
    if (redirect) {
      deleteCookie(COOKIES_NAME.ADMIN_REDIRECT);
      window.location.replace(redirect);
    } else {
      window.location.replace('/');
    }
  };

  // LOGIN
  const loginMutation = useMutation<
    IApiResponse<ILoginResponse>,
    ILoginRequest
  >(login, {
    onError: (err) => {
      setAlertMessage(getErrorMessage(err.data.errorCode.toString()));
      setShowALert(true);
    },
    onSuccess: (res) => handleOnLoginSuccess(res.data.data),
  });

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow p-6 space-y-4 md:space-y-6 sm:p-8 w-96 sm:w-[500px]">
        <div>
          <h2 className="text-gray-900">
            <span className="text-yellow-300 font-bold">Pet</span>opia xin chào quản trị viên
          </h2>
          <h1 className="mt-1 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl ">
            Đăng nhập
          </h1>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <LoginInput
            label={'Email của bạn'}
            type={'email'}
            placeholder={'name@company.com'}
            onchange={e => setValue('email', e.target.value)}
          />
          <LoginInput
            label={'Mật khẩu'}
            type={'password'}
            placeholder={'••••••••'}
            onchange={e => setValue('password', e.target.value)}
          />
          <QueryButton
            name="Đăng nhập"
            isLoading={loginMutation.isLoading}
          />
        </form>
        <Alert
          show={showAlert}
          setShow={setShowALert}
          message={alertMessage}
          failed
        />
      </div>
    </div>
  );
});
