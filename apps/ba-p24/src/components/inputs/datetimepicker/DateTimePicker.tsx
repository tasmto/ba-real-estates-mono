import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateRangeType } from "react-tailwindcss-datepicker/dist/types";

interface Props {
    onChange: (date: DateRangeType) => void;
    value: DateRangeType,
    id?: string
}


const DateTimePicker = ({ onChange, value, id }: Props) => {





    return (
        <div>
            <Datepicker inputId={id}

                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export { DateTimePicker }