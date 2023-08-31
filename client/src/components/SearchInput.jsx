import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchInput() {
    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            // options={countries}
            autoHighlight
        // getOptionLabel={(option) => option.label}
        />
    );
}
