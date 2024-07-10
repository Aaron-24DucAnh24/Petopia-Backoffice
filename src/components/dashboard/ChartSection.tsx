'use client';

import { IChartSection } from '@/interfaces';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';

export const ChartSection = (props: IChartSection) => {
  const [chartWidth, setChartWidth] = useState<number>(1200);
  const [chartHeight, setChartHeight] = useState<number>(300);

  const handleChartSize = () => {
    if (window.innerWidth >= 1024) {
      setChartWidth(window.innerWidth * 2 / 3);
      setChartHeight(300);
    }
    if (window.innerWidth < 1024 && window.innerWidth >= 768) {
      setChartWidth(window.innerWidth * 4 / 5);
      setChartHeight(300);
    }
    if (window.innerWidth < 768) {
      setChartWidth(window.innerWidth - 20);
      setChartHeight(200);
    }
  };

  useEffect(() => {
    handleChartSize();
    window.addEventListener('resize', handleChartSize);
    return () => window.removeEventListener('resize', handleChartSize);
  }, []);

  return (
    <div className='flex flex-wrap'>
      <BarChart
        xAxis={[{
          scaleType: 'band',
          data: props.blogData.map((_, i) => `Ngày ${i + 1}`)
        }]}
        series={[
          { data: props.blogData, label: 'Blog' },
          { data: props.petData, label: 'Thú cưng' },
          { data: props.adoptionData, label: 'Nhận nuôi' }
        ]}
        width={chartWidth}
        height={chartHeight}
      />
    </div>
  );
};