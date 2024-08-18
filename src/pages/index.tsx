import { FormFields } from '../types';
import { UserCard } from '../components/user-card/user-cars';
import { Button } from '../components/button/button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const IndexPage = () => {
  const history = useSelector((state: RootState) => state.history.submissions);
  return (
    <section className="bg-background py-12 md:py-20 flex flex-col gap-4 px-6">
      <div className="flex items-center justify-around m-4">
        <Link to="/form-control">
          <Button type="button">
            <img
              className="inline-flex w-16 h-16"
              src="/icons/digital.png"
              alt="email"
            />
            Control
          </Button>
        </Link>
        <Link to="/form-uncontrolled">
          <Button type="button">
            <img
              className="inline-flex w-16 h-16"
              src="/icons/brain.png"
              alt="email"
            />
            Un-Control
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-4 flex-wrap flex-shrink mx-auto">
        {history.map((item: FormFields, index) => (
          <UserCard key={index} user={item} />
        ))}
      </div>
    </section>
  );
};

export default IndexPage;
