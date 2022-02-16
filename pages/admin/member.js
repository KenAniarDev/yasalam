import Container from '../../components/admin/';
import MemberTable from 'components/SampleTable';

export default function MemberPage() {
  return (
    <Container>
      <h2 className='text-4xl font-medium mb-2'>Member</h2>
      <MemberTable />
    </Container>
  );
}
