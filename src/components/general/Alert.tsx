'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';

interface IAlert {
  failed?: boolean;
  message: string;
  show: boolean;
  title?: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  action?: () => void;
  showCancel?: boolean;
}

export function Alert(props: IAlert) {
  const {
    message,
    show,
    title,
    setShow,
    failed = false,
    action,
    showCancel = true,
  } = props;
  const [className, setClassName] = useState<string>('animate-fade_in');

  const handleOnAnimationEnd = () => {
    className !== 'animate-fade_in' && setShow(false);
    setClassName('animate-fade_in');
  };

  const handleOnClose = (isActive: boolean) => {
    setClassName('animate-fade_out opacity-0');
    isActive && action && action();
  };

  return (
    show && (
      <div
        className={`transition ${className} z-50 !fixed top-0 bottom-0 right-0 left-0 !m-0`}
        onAnimationEnd={handleOnAnimationEnd}
      >
        <div className="h-full w-full absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="h-full w-full absolute inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {failed ? (
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 bg-red-100">
                      <IoCloseCircle size={24} color='red' />
                    </div>
                  ) : (
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FaCheckCircle size={24} color='#008001' />
                    </div>
                  )}
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {title || (failed ? 'Thất bại' : 'Thành công')}
                    </h3>
                    {message && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 flex">
                {action && showCancel && (
                  <button
                    type="button"
                    onClick={() => handleOnClose(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Huỷ
                  </button>
                )}
                <button
                  test-id="alert-ok"
                  type="button"
                  onClick={() => handleOnClose(true)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
