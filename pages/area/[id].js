import { useRouter } from 'next/router';
import React from 'react'

const Area = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log(router.query);
    return (
        <div>{id}</div>
    );
}

export default Area;