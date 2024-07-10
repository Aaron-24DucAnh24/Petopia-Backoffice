'use client';

import { IActUpgradeRequestModel, IApiResponse, IGetUpgradeRequestResponseModel } from '@/interfaces';
import { actUpgradeRequest } from '@/services/api';
import { ORGANIZATION_TYPE, STATIC_URLS } from '@/utils/constants';
import { useMutation } from '@/utils/hooks';
import Image from 'next/image';
import { FaWindowClose, FaCheckSquare } from 'react-icons/fa';
import { UseQueryResult } from 'react-query';
import { Alert } from '../general/Alert';
import { useState } from 'react';

interface IUpgrageRow extends IGetUpgradeRequestResponseModel {
  query: UseQueryResult<any, any>
}

export const UpgradeRow = (props: IUpgrageRow) => {
  const [alertShow, setAlertShow] = useState<boolean>(false);

  const handleUserVisitProfile = () => {
    window.open(`${process.env.NEXT_PUBLIC_FO_ENDPOINT}/user/${props.userId}`);
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

  const actUpgradeRequestMutation = useMutation<IApiResponse<boolean>, IActUpgradeRequestModel>(
    actUpgradeRequest,
    {
      onSuccess: () => setAlertShow(true)
    }
  );

  return (
    <ul className="w-[1880px] flex items-center justify-start mb-1">
      <li className="w-1/12 flex justify-start">
        <div
          className='w-8 h-8 relative cursor-pointer'
          onClick={handleUserVisitProfile}
        >
          <Image
            className='object-cover rounded-full'
            fill
            src={props.userImage || STATIC_URLS.NO_AVATAR}
            alt={props.userImage || STATIC_URLS.NO_AVATAR}
          />
        </div>
      </li>
      <li className="pr-3 overflow-hidden w-2/12 underline italic text-blue-400">
        <a className='overflow-x-scroll block no-scrollbar text-nowrap' href={`mailto: ${props.email}`}>
          {props.email}
        </a>
      </li>
      <li className="w-2/12">{props.phone}</li>
      <li className="w-2/12">{new Date(props.isCreatedAt).toLocaleDateString()}</li>
      <li className="pr-3 overflow-hidden w-4/12">
        <div className='overflow-x-scroll no-scrollbar text-nowrap'>
          {props.address}
        </div>
      </li>
      <li className="pr-3 overflow-hidden w-3/12">
        <div className='overflow-x-scroll no-scrollbar text-nowrap'>
          {props.organizationName}
        </div>
      </li>
      <li className="pr-3 overflow-hidden w-3/12">
        <div className='overflow-x-scroll no-scrollbar text-nowrap'>
          {props.entityName}
        </div>
      </li>
      <li
        className="w-2/12 pr-3 overflow-hidden cursor-pointer hover:underline text-blue-600 italic"
        onClick={() => props.website && window.open(props.website)}
      >
        <div className='overflow-x-scroll no-scrollbar text-nowrap'>
          {props.website || '...'}
        </div>
      </li>
      <li className="w-2/12">{props.taxCode}</li>
      <li className="w-2/12">{getOrganizationType(props.type)}</li>
      <li className="pr-3 overflow-hidden w-4/12">
        <div className='overflow-x-scroll no-scrollbar text-nowrap'>
          {props.description}
        </div>
      </li>
      <li className="w-1/12 flex justify-center cursor-pointer">
        <FaCheckSquare
          color='#92c5fd'
          size={20}
          className='hover:opacity-50'
          onClick={() => actUpgradeRequestMutation.mutate({ id: props.id, accepted: true })}
        />
        <FaWindowClose
          color='red'
          size={20}
          className='hover:opacity-50'
          onClick={() => actUpgradeRequestMutation.mutate({ id: props.id, accepted: false })}
        />
      </li>
      <Alert
        show={alertShow}
        setShow={setAlertShow}
        message={'Thành công'}
        action={() => props.query.refetch()}
      />
    </ul>
  );
};