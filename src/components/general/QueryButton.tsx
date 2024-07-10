import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function QueryButton({
  name,
  isLoading = false,
  action = undefined,
}: {
  name: string;
  isLoading?: boolean;
  action?: () => void;
}) {
  return (
    <button
      type={action ? 'button' : 'submit'}
      className="w-full bg-yellow-300 hover:bg-yellow-500 font-medium rounded-lg text-sm px-2 py-2 sm:px-5 sm:py-2.5 flex justify-center items-center"
      onClick={() => action && action()}
      disabled={isLoading}
    >
      {name}
      {
        isLoading && <span className="ml-2">
          <ClipLoader
            color={'#000000'}
            loading={isLoading}
            size={14}
          />
        </span>
      }
    </button>
  );
}