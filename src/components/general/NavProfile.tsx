'use client';
import { IApiResponse } from '@/interfaces';
import { logout } from '@/services/api';
import { COOKIES_NAME, STATIC_URLS } from '@/utils/constants';
import { useClickOutside, useMutation } from '@/utils/hooks';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface INavProfile {
  image: string | null,
  name: string,
  email: string,
}

export const NavProfile = (props: INavProfile) => {
  const { image, name, email } = props;

  // STATES
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  // LOGOUT
  const logoutMutation = useMutation<IApiResponse<boolean>, undefined>(
    logout,
    {
      onSuccess: () => {
        deleteCookie(COOKIES_NAME.ADMIN_ACCESS_TOKEN_SERVER);
        deleteCookie(COOKIES_NAME.ADMIN_REFRESH_TOKEN_SERVER);
        deleteCookie(COOKIES_NAME.ADMIN_REDIRECT);
        window.location.replace('/login');
      },
    }
  );

  // HANDLERS
  const handleClickProfile = () => {
    window.open(process.env.NEXT_PUBLIC_FO_ENDPOINT + '/user');
  };

  // HANDLE HIDE PROFILE OPTIONS
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  useClickOutside(() => {
    setIsOpenProfile(false);
  }, [buttonRef, optionsRef]);

  return (
    <div className="flex items-center">
      <div className="flex flex-col relative">
        <button
          className="flex text-sm bg-gray-800 rounded-full overflow-hidden md:me-0 focus:ring-4 focus:ring-gray-300 w-8 h-8 relative"
          onClick={() => setIsOpenProfile(!isOpenProfile)}
          ref={buttonRef}
        >
          <Image
            className="object-cover"
            alt="user photo"
            src={image || STATIC_URLS.NO_AVATAR}
            fill
          />
        </button>
        <div
          ref={optionsRef}
          className={`absolute right-0 top-10 z-50 ${isOpenProfile ? '' : 'hidden'
            } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow `}
        >
          <div
            className="px-4 py-3 select-none cursor-pointer"
            onClick={handleClickProfile}
          >
            <span className="block text-sm text-gray-900 ">{name}</span>
            <span className="block text-sm  text-gray-500 truncate ">{email}</span>
          </div>
          <ul className="py-2">
            <Link
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              href={'/'}
              onClick={() => setIsOpenProfile(false)}
            >
              Dashboard
            </Link>
            <Link
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              href={'/management'}
              onClick={() => setIsOpenProfile(false)}
            >
              Trang quản trị
            </Link>
            <li>
              <a
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                onClick={() => logoutMutation.mutate(undefined)}
              >Đăng xuất</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};