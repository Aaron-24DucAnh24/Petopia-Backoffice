'use client';

import { MANAGEMENT_TAB } from '@/utils/constants';
import { Dispatch, SetStateAction } from 'react';

export const ManagementNavigator = (
  { tab, setTab }: { tab: number, setTab: Dispatch<SetStateAction<number>> }
) => {
  return (
    <ul className='flex items-center justify-center w-fit border border-gray-300 rounded text-gray-800 font-medium text-xs tracking-tight cursor-pointer'>
      <li
        className={`p-1 sm:px-3 sm:py-1 rounded ${tab === MANAGEMENT_TAB.USER && 'bg-blue-300'}`}
        onClick={() => setTab(MANAGEMENT_TAB.USER)}
      >Người dùng</li>
      <li
        className={`p-1 sm:px-3 sm:py-1 rounded ${tab === MANAGEMENT_TAB.ORGANIZATION && 'bg-blue-300'}`}
        onClick={() => setTab(MANAGEMENT_TAB.ORGANIZATION)}
      >Đối tác</li>
      <li
        className={`p-1 sm:px-3 sm:py-1 rounded ${tab === MANAGEMENT_TAB.ADMIN && 'bg-blue-300'}`}
        onClick={() => setTab(MANAGEMENT_TAB.ADMIN)}
      >Quản trị viên</li>
      <li
        className={`p-1 sm:px-3 sm:py-1 rounded ${tab === MANAGEMENT_TAB.PET && 'bg-blue-300'}`}
        onClick={() => setTab(MANAGEMENT_TAB.PET)}
      >Thú cưng</li>
      <li
        className={`p-1 sm:px-3 sm:py-1 rounded ${tab === MANAGEMENT_TAB.BLOG && 'bg-blue-300'}`}
        onClick={() => setTab(MANAGEMENT_TAB.BLOG)}
      >Bài đăng</li>
      <li
        className={`p-1 sm:px-3 sm:py-1 rounded ${tab === MANAGEMENT_TAB.UPGRADE_REQUEST && 'bg-blue-300'}`}
        onClick={() => setTab(MANAGEMENT_TAB.UPGRADE_REQUEST)}
      >Xác minh tài khoản</li>
      <li
        className={`p-1 sm:px-3 sm:py-1 rounded ${tab === MANAGEMENT_TAB.REPORT && 'bg-blue-300'}`}
        onClick={() => setTab(MANAGEMENT_TAB.REPORT)}
      >Báo cáo</li>
    </ul>
  );
};