import { Gender, User } from '../types';
import { UserCard } from '../components/user-card/user-cars';

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
  ];
  return (
    <section className="bg-muted py-12 md:py-20 flex gap-4 px-6">
      <UserCard user={users[0]} />
      <UserCard user={users[1]} />
    </section>
  );
};

export default IndexPage;
