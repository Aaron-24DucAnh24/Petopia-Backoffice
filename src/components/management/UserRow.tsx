'use client';

import Image from 'next/image';
import { DisableButton } from './DisableButton';
import { ORGANIZATION_TYPE, STATIC_URLS, USER_ROLE } from '@/utils/constants';
import { IGetUsersResponseModel } from '@/interfaces';

interface IUserRow {
  type: USER_ROLE,
  data: IGetUsersResponseModel,
}

export const UserRow = (props: IUserRow) => {
  const { type, data } = props;

  const handleVisitProfile = () => {
    window.open(`${process.env.NEXT_PUBLIC_FO_ENDPOINT}/user/${data.id}`);
  };

  const getOrganizationType = (type: ORGANIZATION_TYPE) => {
    switch (type) {
      case ORGANIZATION_TYPE.BUSINESS:
        return 'Doanh nghiệp';

      case ORGANIZATION_TYPE.RESCUE:
        return 'Trạm cứu hộ';

      case ORGANIZATION_TYPE.VET:
        return 'Thú y';

      default:
        return 'Khác';
    }
  };

  return (
    <ul className="w-full flex items-center justify-start mb-1">
      <li className="w-1/12 flex justify-start">
        <div
          className='w-8 h-8 relative cursor-pointer'
          onClick={handleVisitProfile}
        >
          <Image
            className='object-cover rounded-full'
            fill
            src={data.image || STATIC_URLS.NO_AVATAR}
            alt={data.image}
          />
        </div>
      </li>
      <li className="pr-3 overflow-hidden w-2/12">
        <div className='overflow-x-scroll no-scrollbar text-nowrap'>
          {type === USER_ROLE.ORGANIZATION ? data.organizationName : data.name}
        </div>
      </li>
      <li className="pr-3 overflow-hidden w-2/12 underline italic text-blue-400">
        <a className='overflow-x-scroll block no-scrollbar text-nowrap' href={`mailto: ${data.email}`}>
          {data.email}
        </a>
      </li>
      <li className="pr-3 overflow-hidden w-2/12">
        <div className='overflow-x-scroll no-scrollbar text-nowrap'>
          {type === USER_ROLE.ORGANIZATION ? getOrganizationType(data.organizationType) : (data.phone || '...')}
        </div>
      </li>
      <li className="pr-3 overflow-hidden w-4/12">
        <div className='overflow-x-scroll no-scrollbar text-nowrap'>
          {data.address || '...'}
        </div>
      </li>
      <li className="pr-3 overflow-hidden w-1/12">
        <div className='overflow-x-scroll no-scrollbar text-nowrap'>
          {new Date(data.isCreatedAt).toLocaleDateString()}
        </div>
      </li>
      <li className="w-1/12 flex justify-center">
        {
          type !== USER_ROLE.SYSTEM_ADMIN &&
          <DisableButton
            isDeactivated={data.isDeactivated}
            id={data.id}
            type={'user'}
          />
        }
      </li>
    </ul>
  );
};