import { useForm } from 'react-hook-form';
import Pagination from '../general/Pagination';
import { ReportRow } from './ReportRow';
import { useEffect, useState } from 'react';
import { IApiResponse, IGetReportResponseModel, IPaginationModel } from '@/interfaces';
import { QueryProvider } from '../general/QueryProvider';
import { LoadingScreen } from '../general/LoadingScreen';
import { PAGE_SIZE, QUERY_KEYS, REPORT_ENTITY } from '@/utils/constants';
import { useQuery } from '@/utils/hooks';
import { getReports } from '@/services/api';

export const ReportManagementTable = QueryProvider(() => {
  // FORMS
  const paginationForm = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 5,
    }
  });

  // STATES
  const [reports, setReports] = useState<IGetReportResponseModel[]>();
  const [reportEntity, setReportEntity] = useState<number>(REPORT_ENTITY.User);

  // QUERIES
  const getReportsQuery = useQuery<IApiResponse<IGetReportResponseModel[]>>(
    [QUERY_KEYS.GET_UPGRADE_REQUESTS, paginationForm.watch('pageIndex'), reportEntity],
    () => getReports({
      pageIndex: paginationForm.watch('pageIndex'),
      pageSize: PAGE_SIZE,
      filter: {
        reportEntity: reportEntity,
      },
    }),
    {
      onSuccess: res => {
        const pageNumber = res.data.pageNumber;
        setReports(res.data.data);
        pageNumber && paginationForm.setValue('pageNumber', pageNumber);
      },
      refetchOnWindowFocus: false,
    }
  );

  // EFFECTS
  useEffect(() => {
    paginationForm.setValue('pageIndex', 1);
  }, [reportEntity]);

  return (
    <>
      <ul className='flex items-center justify-center w-fit border border-gray-300 rounded text-gray-800 font-medium text-xs tracking-tight cursor-pointer'>
        <li
          className={`p-1 sm:px-3 sm:py-1 rounded ${reportEntity === REPORT_ENTITY.User && 'bg-blue-300'}`}
          onClick={() => setReportEntity(REPORT_ENTITY.User)}
        >Người dùng</li>
        <li
          className={`p-1 sm:px-3 sm:py-1 rounded ${reportEntity === REPORT_ENTITY.Pet && 'bg-blue-300'}`}
          onClick={() => setReportEntity(REPORT_ENTITY.Pet)}
        >Thú cưng</li>
        <li
          className={`p-1 sm:px-3 sm:py-1 rounded ${reportEntity === REPORT_ENTITY.Blog && 'bg-blue-300'}`}
          onClick={() => setReportEntity(REPORT_ENTITY.Blog)}
        >Blog</li>
      </ul>
      <div className="w-full text-sm border border-gray-300 p-4 rounded overflow-x-scroll flex-nowrap">
        <ul className="w-full flex items-center justify-start font-semibold mb-4">
          <li className="w-1/12 flex justify-center">Profile</li>
          <li className="w-2/12 flex justify-center">Tổng</li>
          <li className="w-2/12 flex justify-center">Rác</li>
          <li className="w-2/12 flex justify-center">Lừa đảo</li>
          <li className="w-2/12 flex justify-center">Không phù hợp</li>
          <li className="w-2/12 flex justify-center">Khác</li>
          <li className="w-1/12 flex justify-center">Vô hiệu hoá</li>
        </ul>
        {
          !getReportsQuery.isLoading && reports && reports.map(report =>
            <ReportRow key={report.id} reportEntity={reportEntity} {...report} />
          )
        }
      </div>

      <div className='w-full flex justify-center'>
        <Pagination
          paginationForm={paginationForm}
          show={true}
          disable={false}
        />
      </div>

      <LoadingScreen show={getReportsQuery.isLoading} />
    </>
  );
});