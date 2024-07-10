'use client';

import Image from 'next/image';
import { DisableButton } from './DisableButton';
import { IGetBlogResponseModel } from '@/interfaces';
import { BLOG_CATEGORIES, STATIC_URLS } from '@/utils/constants';

export const BlogRow = (props: IGetBlogResponseModel) => {
  const handleUserVisitProfile = () => {
    window.open(`${process.env.NEXT_PUBLIC_FO_ENDPOINT}/user/${props.userId}`);
  };

  const handleBlogVisitProfile = () => {
    window.open(`${process.env.NEXT_PUBLIC_FO_ENDPOINT}/blog/${props.id}`);
  };

  const getBlogCategory = (value: BLOG_CATEGORIES) => {
    if (value === BLOG_CATEGORIES.ART) return 'Nghệ thuật';
    if (value === BLOG_CATEGORIES.HEALTH) return 'Sức khoẻ';
    if (value === BLOG_CATEGORIES.PRODUCT) return 'Sản phẩm';
    return 'Huấn luyện';
  };

  const getAdvertimentDate = () => {
    let result = new Date(props.advertisingDate).toLocaleDateString();
    if (result === '1/1/1') return '...';
    return result;
  };

  return (
    <ul className="w-[1480px] flex items-center justify-start mb-1">
      <li className="w-1/12 flex justify-start">
        <div
          className='w-8 h-8 relative cursor-pointer'
          onClick={handleBlogVisitProfile}
        >
          <Image
            className='object-cover rounded-full'
            fill
            src={props.image}
            alt={props.image}
          />
        </div>
      </li>
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
      <li className="w-4/12">{props.title}</li>
      <li className="w-1/12">
        {getBlogCategory(props.category)}
      </li>
      <li className="w-1/12">{props.view}</li>
      <li className="w-1/12">
        {new Date(props.isCreatedAt).toLocaleDateString()}
      </li>
      <li className="w-1/12">
        {new Date(props.isUpdatedAt).toLocaleDateString()}
      </li>
      <li className={`w-1/12 ${new Date(props.advertisingDate) <= new Date() ? 'text-red-600' : 'text-[#92c5fd]'}`}>
        {getAdvertimentDate()}
      </li>
      <li className="w-1/12 flex justify-center">
        {
          <DisableButton isDeactivated={props.isHidden} id={props.id} type={'blog'} />
        }
      </li>
    </ul>
  );
};