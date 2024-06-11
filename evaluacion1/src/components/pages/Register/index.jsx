import React from 'react';
import LayoutComponent from '../../layout';
import FormRegister from '../../FormRegister';
import ImageLogin from '../../ImageLogin'

const Register = () => {
    return (
        <LayoutComponent
        leftColSize={{xs:0, sm:0, md:8, lg: 6}}
        rightColSize={{xs:24, sm:24, md:16, lg:18}}
        leftContent={<ImageLogin />}
        rightContent={<FormRegister />}
      />
    );
};

export default Register;