import React, { ReactElement } from 'react';

interface IProps {
    children?: ReactElement | ReactElement[];
}

const Layout:React.FC<IProps> = ({
    children,
}) => {


    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;
