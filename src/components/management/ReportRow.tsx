'use client';

import Image from 'next/image';
import { DisableButton } from './DisableButton';
import { IGetReportResponseModel } from '@/interfaces';
import { REPORT_ENTITY, STATIC_URLS } from '@/utils/constants';

interface IReportRow extends IGetReportResponseModel {
  reportEntity: REPORT_ENTITY
}

export const ReportRow = (props: IReportRow) => {

  const handleVisitProfile = () => {
    let entity: string = '';
    if (props.reportEntity === REPORT_ENTITY.Blog) entity = 'blog';
    if (props.reportEntity === REPORT_ENTITY.User) entity = 'user';
    if (props.reportEntity === REPORT_ENTITY.Pet) entity = 'pet';

    window.open(
      `${process.env.NEXT_PUBLIC_FO_ENDPOINT}/${entity}/${props.id}`
    );
  };

  return (
    <ul className="w-full flex items-center justify-start mb-1 italic font-medium">
      <li className="w-1/12 flex justify-center">
        <div
          className='w-8 h-8 relative cursor-pointer'
          onClick={handleVisitProfile}
        >
          <Image
            className='object-cover rounded-full'
            fill
            src={STATIC_URLS.NO_AVATAR}
            alt={STATIC_URLS.NO_AVATAR}
          />
        </div>
      </li>
      <li className="w-2/12 flex justify-center text-red-600 font-semibold">
        {
          props.inappropriateContent
          + props.other
          + props.scam
          + props.spam
        }
      </li>
      <li className="w-2/12 flex justify-center">{props.scam}</li>
      <li className="w-2/12 flex justify-center">{props.spam}</li>
      <li className="w-2/12 flex justify-center">{props.inappropriateContent}</li>
      <li className="w-2/12 flex justify-center">{props.other}</li>
      <li className="w-1/12 flex justify-center">
        {
          <DisableButton
            isDeactivated={false}
            id={props.id}
            type={props.reportEntity === REPORT_ENTITY.User
              ? 'user'
              : props.reportEntity === REPORT_ENTITY.Blog
                ? 'blog'
                : 'pet'
            }
          />
        }
      </li>
    </ul>
  );
};