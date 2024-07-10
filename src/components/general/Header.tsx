'use client';
import { useStores } from '@/store';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { NavProfile } from './NavProfile';
import { useQuery } from '@/utils/hooks';
import { COOKIES_NAME, QUERY_KEYS } from '@/utils/constants';
import { getCookie } from 'cookies-next';
import { QueryProvider } from './QueryProvider';
import { IApiResponse, ICurrentUserCoreResponse } from '@/interfaces';
import { getCurrentUserCore } from '@/services/api';


export const Header = observer(QueryProvider(() => {
  const { userStore } = useStores();

  // GET CURRENT USER CONTEXT
  useQuery<IApiResponse<ICurrentUserCoreResponse>>(
    [QUERY_KEYS.GET_CURRENT_USER_CORE],
    getCurrentUserCore,
    {
      onSuccess: (res) => userStore.setUserContext(res.data.data),
      enabled: !!getCookie(COOKIES_NAME.ADMIN_ACCESS_TOKEN_SERVER),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="w-full fixed top-0 bg-yellow-200 z-50 h-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-full">
        <Link
          href="/"
          className="flex items-center bg-white p-1 rounded"
        >
          <span className="self-center text-2xl whitespace-nowrap text-gray-900">
            <span className="text-yellow-300">Pet</span>opia
          </span>
        </Link>
        {userStore.userContext &&
          <NavProfile
            name={userStore.userContext.name}
            image={userStore.userContext.image}
            email={userStore.userContext.email} />}
      </div>
    </div>
  );
}));
