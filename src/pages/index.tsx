import { User } from '../types';
import { UserCard } from '../components/user-card/user-cars';
import { Button } from '../components/button/button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const IndexPage = () => {
  const history = useSelector((state: RootState) => state.history.submissions);
  return (
    <main className="bg-background py-12 md:py-20 flex flex-col gap-4 px-6">
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
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  mx-auto profile-list-grid">
        {history.map((item: User, index) => (
          <UserCard key={index} user={item} />
        ))}
      </section>
    </main>
  );
};

export default IndexPage;
