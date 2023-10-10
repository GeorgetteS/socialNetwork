import dynamic from 'next/dynamic';

const DynamicAuthPanel = dynamic(() => import('../components/auth/AuthPanel'));

const Autn = () => {
  return (
    <div className="">
      <DynamicAuthPanel />{' '}
    </div>
  );
};

export default Autn;
