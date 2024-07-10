'use client';

import { IParameterSection } from '@/interfaces';
import { ParameterCard } from './ParameterCard';

export const ParameterSection = (props: IParameterSection) => {
  return (
    <div className='md:w-4/5 lg:w-2/3 flex items-start flex-wrap justify-around px-2 md:pl-10'>
      <ParameterCard
        value={props.income}
        label={'Thu nhập'}
        desc={'Trong tháng này'}
        unit='đ'
      />
      <ParameterCard
        value={props.petNumber}
        label={'Thú cưng'}
      />
      <ParameterCard
        value={props.individualNumber}
        label={'Người dùng cá nhân'}
      />
      <ParameterCard
        value={props.blogNumber}
        label={'Blog'}
      />
      <ParameterCard
        value={props.organizationNumber}
        label={'Đối tác'}
      />
      <ParameterCard
        value={props.activeRate}
        label={'Người dùng hoạt động'}
        desc={'Trong tháng này'}
        special
        unit='%'
      />
    </div>
  );
};