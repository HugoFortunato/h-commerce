import { SignUp } from '@clerk/nextjs';
import React from 'react';

type SignInPageProps = {
  searchParams: {
    redirectUrl: string;
  };
};

export default function SignInUp({
  searchParams: { redirectUrl },
}: SignInPageProps) {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <SignUp signInUrl="/sign-up" redirectUrl={redirectUrl} />
        </div>
      </div>
    </section>
  );
}
