import Header from '../../components/authentication/Header';
import Signup from '../../components/authentication/Signup';

export default function SignupPage() {
  return (
    <>
      <div className='min-h-[80vh] grid grid-cols-1 content-center'>
        <div className='w-[100%]'>
          <Header
            heading='Signup to create an account'
            paragraph='Already have an account? '
            linkName='Login'
            linkUrl='/login'
          />
          <Signup />
        </div>
      </div>
    </>
  );
}
