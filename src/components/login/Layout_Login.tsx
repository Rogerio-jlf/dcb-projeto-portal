"use client";

import BackgroundLogin from "./Background_Login";
import TextoLogin from "./Texto_Login";
import FormLogin from "./Form_Login";

export default function LayoutLogin() {
  return (
    <div className="min-h-screen flex relative">
      <BackgroundLogin />
      <TextoLogin />
      <div className="relative z-10 w-full flex justify-end">
        <div className="min-h-screen flex items-center justify-center p-8 w-full md:w-1/2 lg:w-2/5">
          <div className="w-full max-w-md">
            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
