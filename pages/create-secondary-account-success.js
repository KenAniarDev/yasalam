export default function CreateAccountPage() {
  return (
    <>
      <div className='container'>
        <img
          src={'/pattern1920x1080.png'}
          alt=''
          className='fixed top-0 left-0 right-0 bottom-0 h-full w-full object-cover'
        />
        <div className='h-screen w-full flex justify-center items-center'>
          <div className='card shadow-lg compact side bg-accent p-5 my-2'>
            <h1 className='text-white text-4xl font-semibold text-center mb-4'>
              ACCOUNT CREATED
            </h1>
            <p className='text-center text-xl'>Secondary Account Created</p>
          </div>
        </div>
      </div>
    </>
  );
}
