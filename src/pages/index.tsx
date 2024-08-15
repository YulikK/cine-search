import { Gender, User } from '../types';
import { UserCard } from '../components/user-card/user-cars';
import { Button } from '../components/button/button';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  const users: User[] = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '',
      age: 32,
      gender: Gender.M,
      country: 'USA',
      terms: true,
      password: '123',
    },
    {
      name: 'Mac D',
      email: 'john@example.com',
      avatar: '',
      age: 22,
      gender: Gender.F,
      country: 'Polish',
      terms: false,
      password: '321',
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '',
      age: 32,
      gender: Gender.M,
      country: 'USA',
      terms: true,
      password: '123',
    },
    {
      name: 'Mac D',
      email: 'john@example.com',
      avatar: '',
      age: 22,
      gender: Gender.F,
      country: 'Polish',
      terms: false,
      password: '321',
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '',
      age: 32,
      gender: Gender.M,
      country: 'USA',
      terms: true,
      password: '123',
    },
    {
      name: 'Mac D',
      email: 'john@example.com',
      avatar: '',
      age: 22,
      gender: Gender.F,
      country: 'Polish',
      terms: false,
      password: '321',
    },
  ];
  return (
    <section className="bg-muted py-12 md:py-20 flex flex-col gap-4 px-6">
      <div className="flex items-center justify-around m-4">
        <Link to="/form-control">
          <Button>
            <img
              className="inline-flex w-16 h-16"
              src="/icons/digital.png"
              alt="email"
            />
            Control
          </Button>
        </Link>
        <Link to="/form-uncontrolled">
          <Button>
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
        {users.map((item: User, index) => (
          <UserCard key={index} user={item} />
        ))}
      </div>
    </section>
  );
};

export default IndexPage;
