import React, { PropsWithChildren } from 'react';

type ControlFormsProps = {
    label: string;
    style?: React.CSSProperties;
}

export default function ControlForm(props: PropsWithChildren<ControlFormsProps>) {
    return (
        <form style={{...props.style}}>
            <label>
                {`${props.label}: `}
            </label>
            {props.children}
        </form>
    )
}