'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import { Button } from 'rizzui';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/ecommerce/product/product-list/columns';
import { useDocuments } from '@/contexts/DocumentContext';
import { Document } from '@/types';
const FilterElement = dynamic(
  () => import('@/app/shared/ecommerce/product/product-list/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  price: ['', ''],
  createdAt: [null, null],
  status: '',
};

export default function ProductsTable({ data = [] }: { data: any[] }) {
  const [pageSize, setPageSize] = useState(10);

  const { documents, fetchDocuments } = useDocuments();

  useEffect(() => {
    fetchDocuments(true);
  }, [fetchDocuments]);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(documents, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data: documents,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  const onAddToCart = useCallback(() => {
    const selectedDocuments = documents.filter((doc: Document) =>
      selectedRowKeys.map(Number).includes(doc.ID)
    );
    console.log('selectedDocuments', selectedDocuments);
  }, [selectedRowKeys, documents]);

  return (
    <ControlledTable
      variant="modern"
      isLoading={isLoading}
      showLoadingText={true}
      data={tableData}
      // @ts-ignore
      columns={visibleColumns}
      paginatorOptions={{
        pageSize,
        setPageSize,
        total: totalItems,
        current: currentPage,
        onChange: (page: number) => handlePaginate(page),
      }}
      filterOptions={{
        searchTerm,
        onSearchClear: () => {
          handleSearch('');
        },
        onSearchChange: (event) => {
          handleSearch(event.target.value);
        },
        hasSearched: isFiltered,
        columns,
        checkedColumns,
        setCheckedColumns,
        enableDrawerFilter: true,
      }}
      filterElement={
        <FilterElement
          filters={filters}
          isFiltered={isFiltered}
          updateFilter={updateFilter}
          handleReset={handleReset}
        />
      }
      tableFooter={
        <TableFooter
          checkedItems={selectedRowKeys}
        >
          <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800" onClick={onAddToCart}>
            Add {selectedRowKeys.length}{' '}
            {selectedRowKeys.length > 1 ? 'Items' : 'Item'}{' '}
            to Cart
          </Button>
        </TableFooter>
      }
      className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
    />
  );
}
