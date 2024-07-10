import { useState } from 'react';
import QueryButton from '../general/QueryButton';
import { LoginInput } from '../login/LoginInput';

interface ICreateAdminForm {
  onSubmit: (email: string) => void,
}

export const CreateAdminForm = ({ onSubmit }: ICreateAdminForm) => {
  const [email, setEmail] = useState<string>('');

  return (
    <form
      className="flex flex-col bg-white border border-gray-300 rounded p-8 space-y-6 min-w-80"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email);
      }}
    >
      <h2 className='text-lg font-semibold'>Thêm quản trị viên</h2>
      <LoginInput
        label={'Email'}
        type={'email'}
        placeholder={'company@gmail.com'}
        onchange={e => setEmail(e.target.value)}
      />
      <QueryButton name={'+Thêm'} />
    </form>
  );
};