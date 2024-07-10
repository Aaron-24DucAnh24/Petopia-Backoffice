import { ChangeEventHandler, useRef } from 'react';

interface ILoginInput {
  label: string,
  type: 'password' | 'email',
  placeholder: string,
  onchange?: ChangeEventHandler<HTMLInputElement> | undefined
};

export const LoginInput = (props: ILoginInput) => {
  const { type, label, placeholder, onchange } = props;
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        onClick={() => { ref.current?.focus(); }}
      >
        {label}
      </label>
      <input
        ref={ref}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 "
        placeholder={placeholder}
        required
        onChange={onchange}
      />
    </div>
  );
};