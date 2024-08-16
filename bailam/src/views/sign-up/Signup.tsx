import React from "react";

export function SignUp() {
  return (
    <div className="w-full h-screen bg-gray-400">
      <form className="bg-white shadow-2xl w-max wx-auto">
        <h2 className="text-center font-semiboil text-2xl">Trang đăng kí</h2>
        <div className="flex flex-col gap-10">
            <label htmlFor="">Nhập email</label>
            <input type="text" />
        </div>
        <div className="">
            <label htmlFor="">Nhập số điện thoại</label>
            <input type="text" />
        </div>
        <div className="">
            <label htmlFor="">Nhập mật khẩu</label>
            <input type="text" />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
