"use client"

import ReactSelect, {StylesConfig, Props as ReactSelectProps} from 'react-select'

export interface Option {
    label: string;
    value: string;
}

interface Props extends ReactSelectProps {
    options: Option[];

}

export const Select = ({options, ...props}: Props) => {
    const darkThemeStyles: StylesConfig = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#000',
            borderColor: state.isFocused ? '#555' : '#444',
            boxShadow: state.isFocused ? '0 0 0 1px #555' : 'none',
            '&:hover': { borderColor: '#666' },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#000',
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
            borderRadius: "6px",
            boxShadow: '1px 0px 80px 5px #000',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#000000'
                : state.isFocused
                    ? '#131313'
                    : '#272727',
            color: '#fff',
            cursor: 'pointer',
            '&:active': {
                backgroundColor: '#555',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#fff',
        }),
        input: (provided) => ({
            ...provided,
            color: '#fff',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#bbb',
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            backgroundColor: '#444',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#fff',
        }),
    };

    return <ReactSelect styles={darkThemeStyles} options={options} {...props} />
}