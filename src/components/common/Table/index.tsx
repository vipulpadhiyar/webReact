import { StyledTable } from './style';

import { TableProps } from 'antd';
import React from 'react';

interface CustomProps {
  summaryRow?: React.ReactNode;
}

export const TableSummaryCell: React.FC<{
  index: number;
  colSpan: number;
  component: React.ReactNode;
}> = ({ index, colSpan, component }: any) => (
  <StyledTable.Summary.Cell index={index} colSpan={colSpan}>
    {component}
  </StyledTable.Summary.Cell>
);

export const CommonTable: React.FC<TableProps<any> & CustomProps> = (props: any) => {
  const { summaryRow, rowSelection } = props;

  return (
    <StyledTable
      size="small"
      {...props}
      scroll={{ x: 'max-content' }}
      rowSelection={rowSelection}
      // pagination={{ ...PaginationSettings, ...pagination }}
      summary={
        summaryRow
          ? () => (
              <StyledTable.Summary fixed="top">
                <StyledTable.Summary.Row>{summaryRow}</StyledTable.Summary.Row>
              </StyledTable.Summary>
            )
          : undefined
      }
    />
  );
};
