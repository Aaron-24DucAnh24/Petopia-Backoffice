'use client';

import { useState } from 'react';
import { ManagementNavigator } from './ManagementNavigator';
import { MANAGEMENT_TAB, USER_ROLE } from '@/utils/constants';
import { UserManagementTable } from './UserManagementTable';
import { PetManagementTable } from './PetManagementTable';
import { BlogManagementTable } from './BlogManagementTable';
import { UpgradeManagementTable } from './UpgradeManagementTable';
import { ReportManagementTable } from './ReportManagementTable';

export const ManagementSection = () => {
  const [tab, setTab] = useState<number>(MANAGEMENT_TAB.USER);

  return (
    <div className="flex flex-col h-fit-screen items-center py-10 max-w-screen-xl px-2 mx-auto sm:px-0 space-y-10">
      <h3 className="text-2xl font-semibold text-[#0BA5E9]">Trang quản trị</h3>
      <ManagementNavigator tab={tab} setTab={setTab} />
      {tab === MANAGEMENT_TAB.USER && <UserManagementTable type={USER_ROLE.STANDARD_USER} />}
      {tab === MANAGEMENT_TAB.ORGANIZATION && <UserManagementTable type={USER_ROLE.ORGANIZATION} />}
      {tab === MANAGEMENT_TAB.ADMIN && <UserManagementTable type={USER_ROLE.SYSTEM_ADMIN} />}
      {tab === MANAGEMENT_TAB.PET && <PetManagementTable />}
      {tab === MANAGEMENT_TAB.BLOG && <BlogManagementTable />}
      {tab === MANAGEMENT_TAB.UPGRADE_REQUEST && <UpgradeManagementTable />}
      {tab === MANAGEMENT_TAB.REPORT && <ReportManagementTable />}
    </div>
  );
};