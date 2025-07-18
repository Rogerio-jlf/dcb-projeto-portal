"use client";

import BackgroundLogin from "./Background_Login";
import FormLogin from "./Form_Login";
import TextoLogin from "./Texto_Login";

export default function LayoutLogin() {
  return (
    <div className="relative flex min-h-screen">
      <BackgroundLogin />
      <TextoLogin />
      <div className="relative z-10 flex w-full justify-end">
        <div className="flex min-h-screen w-full items-center justify-center p-8 md:w-1/2 lg:w-2/5">
          <div className="w-full max-w-md">
            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
