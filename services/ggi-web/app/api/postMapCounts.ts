'use server';
// app/api/postMapCounts.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { MapCounts } from '@/models/map/MapItem';

export const POST = async (request: Request) => {
  const formData: MapCounts = await request.json();
  
  const errorCode400Regex = /^400\d{2}$/;
  let ok = false;

  try {
    const response = await axios.post('/ggi/api/map/map-counts', formData);

    if (response.data.success === true) {
      return NextResponse.json(response.data.data);
    } else if (errorCode400Regex.test(response.data.code.toString()) && !ok) {
      ok = true;
      setTimeout(() => {
        // alert('지도 검색은 유료서비스 입니다. 로그인 후 이용해주세요.');
        // window.close();
      }, 500);
      return NextResponse.json({ message: 'Validation error', code: response.data.code }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
