import { useForm } from 'react-hook-form';
import Pagination from '../general/Pagination';
import { BlogRow } from './BlogRow';
import { IApiResponse, IGetBlogResponseModel, IPaginationModel } from '@/interfaces';
import { QueryProvider } from '../general/QueryProvider';
import { useState } from 'react';
import { useQuery } from '@/utils/hooks';
import { PAGE_SIZE, QUERY_KEYS } from '@/utils/constants';
import { getBlogs } from '@/services/api';
import { LoadingScreen } from '../general/LoadingScreen';

export const BlogManagementTable = QueryProvider(() => {
  const paginationForm = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 5,
    }
  });

  // STATES
  const [blogs, setBlogs] = useState<IGetBlogResponseModel[]>();

  // QUERIES
  const getBlogsQuery = useQuery<IApiResponse<IGetBlogResponseModel[]>>(
    [QUERY_KEYS.GET_PETS, paginationForm.watch('pageIndex')],
    () => getBlogs({
      pageIndex: paginationForm.watch('pageIndex'),
      pageSize: PAGE_SIZE,
    }),
    {
      onSuccess: res => {
        const pageNumber = res.data.pageNumber;
        setBlogs(res.data.data);
        pageNumber && paginationForm.setValue('pageNumber', pageNumber);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <div className="w-full text-sm border border-gray-300 p-4 rounded overflow-x-scroll flex-nowrap">
        <ul className="w-[1480px] flex items-center justify-start font-semibold mb-4">
          <li className="w-1/12">Profile</li>
          <li className="w-1/12">Tác giả</li>
          <li className="w-4/12">Tiêu đề</li>
          <li className="w-1/12">Loại</li>
          <li className="w-1/12">Lượt xem</li>
          <li className="w-1/12">Ngày tạo</li>
          <li className="w-1/12">Ngày cập nhật</li>
          <li className="w-1/12">Hạn QC</li>
          <li className="w-1/12 flex justify-center">Vô hiệu hoá</li>
        </ul>
        {
          !getBlogsQuery.isLoading && blogs && blogs.map(blog =>
            <BlogRow key={blog.id} {...blog} />
          )
        }
      </div>

      <div className='w-full flex justify-center'>
        <Pagination
          paginationForm={paginationForm}
          show={true}
          disable={getBlogsQuery.isLoading}
        />
      </div>

      <LoadingScreen show={getBlogsQuery.isLoading} />
    </>
  );
});