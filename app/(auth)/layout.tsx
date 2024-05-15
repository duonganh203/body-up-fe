import React from "react";
import { FeatureSticker } from "./feature-sticker";
type Props = {
    children: React.ReactNode;
};
const AuthLayout = ({ children }: Props) => {
    return (
        <div className='w-full h-[804px] flex'>
            <div className='w-[50%]'>{children}</div>
            <FeatureSticker />
        </div>
    );
};

export default AuthLayout;
