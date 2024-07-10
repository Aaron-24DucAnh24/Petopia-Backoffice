'use client';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ChartSection } from './ChartSection';
import { ParameterSection } from './ParameterSection';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { QueryProvider } from '../general/QueryProvider';
import { useQuery } from '@/utils/hooks';
import { QUERY_KEYS } from '@/utils/constants';
import { IApiResponse, IChartSection, IDashboardRequest, IDashboardResponse, IParameterSection } from '@/interfaces';
import { getDashboard } from '@/services/api';
import { useState } from 'react';
import { LoadingScreen } from '../general/LoadingScreen';

export const DashBoard = QueryProvider(() => {
  // FORMS
  const { setValue, watch } = useForm<IDashboardRequest>({
    defaultValues: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    }
  });

  // STATES
  const [paramData, setParamData] = useState<IParameterSection>();
  const [chartData, setChartData] = useState<IChartSection>();

  // HANDLERS
  const handleSetTime = (value: dayjs.Dayjs | null) => {
    value && setValue('month', value.month() + 1);
    value && setValue('year', value.year());
  };

  // QUERIES
  const getDashboardQuery = useQuery<IApiResponse<IDashboardResponse>>(
    [QUERY_KEYS.GET_DASHBOARD, watch()],
    () => getDashboard(watch()),
    {
      onSuccess: res => {
        setChartData(res.data.data);
        setParamData(res.data.data);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="flex h-fit-screen flex-col items-center space-y-10 py-10">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <h3 className="text-2xl font-semibold text-[#0BA5E9]">Dashboard</h3>
          <DatePicker
            label={'Chọn tháng'}
            views={['month', 'year']}
            onChange={handleSetTime}
            disabled={getDashboardQuery.isLoading}
          />
        </div>
        {!getDashboardQuery.isLoading && paramData && <ParameterSection {...paramData} />}
        {!getDashboardQuery.isLoading && chartData && <ChartSection {...chartData} />}
      </LocalizationProvider>
      <LoadingScreen show={getDashboardQuery.isLoading} />
    </div>
  );
});