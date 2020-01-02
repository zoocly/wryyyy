import React from 'react';
export default function index(prop:any) {
  const {a = ''} = prop;
  // console.log(a,'render了');
  return (
    <div>
      这个是儿啊
    </div>
  )
}
