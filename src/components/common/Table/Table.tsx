import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import type { TableProps as MuiTableProps } from '@mui/material';

interface Column<T> {
    id: keyof T | string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: unknown, row: T) => React.ReactNode;
}

interface TableProps<T> extends MuiTableProps {
    columns: Column<T>[];
    rows: T[];
    onRowClick?: (row: T) => void;
}

const Table = <T extends { id: string | number }>({
    columns,
    rows,
    onRowClick,
    ...props
}: TableProps<T>) => {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <MuiTable stickyHeader aria-label="sticky table" {...props}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={String(column.id)}
                                align={column.align}
                                style={{ minWidth: column.minWidth, fontWeight: 600, backgroundColor: '#f9fafb' }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}
                                onClick={() => onRowClick && onRowClick(row)}
                                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                            >
                                {columns.map((column) => {
                                    const value = (row as Record<string, unknown>)[column.id as string];
                                    return (
                                        <TableCell key={String(column.id)} align={column.align}>
                                            {column.format ? column.format(value, row) : (value as React.ReactNode)}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
