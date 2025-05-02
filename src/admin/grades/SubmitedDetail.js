import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Eye } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import AssesmentDetail from '../class/AsssesmentDetail';

export default function SubmitedDetail() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const assesmentId = queryParams.get('assesment_id');
    const siswaId = queryParams.get('siswa_id');


    return (
        <>
            <AssesmentDetail />
            <p>jdkdk</p>
        </>
    );
}
