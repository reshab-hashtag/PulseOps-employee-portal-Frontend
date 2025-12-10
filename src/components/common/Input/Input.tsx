import { forwardRef } from 'react';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
    label: string;
    error?: boolean;
    helperText?: string;
}

const Input = forwardRef<HTMLDivElement, InputProps>(
    ({ label, error, helperText, ...props }, ref) => {
        return (
            <TextField
                ref={ref}
                label={label}
                variant="outlined"
                error={error}
                helperText={helperText}
                fullWidth
                size="small"
                {...props}
                sx={{
                    mb: 2,
                    ...props.sx
                }}
            />
        );
    }
);

Input.displayName = 'Input';

export default Input;
